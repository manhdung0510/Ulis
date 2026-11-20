import { consultContentVi } from '@/content/vi/consult';
import { consultContentEn } from '@/content/en/consult';
import type { AppLanguage, ConsultPost, ConsultTopic, SampleReply } from '@/types/domain';
import { waitSimulatedDelay } from './delay';
import { readStorageState, registerConsultSeedProvider, updateStorageState } from './storage';

registerConsultSeedProvider(() => consultContentVi.seedPosts);

export interface CreateConsultPostInput {
  title: string;
  content: string;
  topic: ConsultTopic;
  isAnonymous: boolean;
  authorName?: string;
  language?: AppLanguage;
}

export interface IConsultService {
  getPosts(nowMs?: number): Promise<ConsultPost[]>;
  createPost(input: CreateConsultPostInput): Promise<ConsultPost>;
  resolveReadyReplies(nowMs?: number, language?: AppLanguage): Promise<ConsultPost[]>;
  deletePost(id: string): Promise<void>;
}

/**
 * Băm chuỗi đơn giản thành số nguyên không âm để tính độ trễ phản hồi 6–10 giây xác định.
 */
function hashString(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function computeSampleReplyDelayMs(seed: string): number {
  return 6000 + (hashString(seed) % 4001);
}

export function isSampleReplyReady(post: ConsultPost, nowMs: number = Date.now()): boolean {
  if (post.sampleReply) return true;
  if (!post.replyReadyAt) return false;
  const readyMs = Date.parse(post.replyReadyAt);
  return !Number.isNaN(readyMs) && nowMs >= readyMs;
}

export interface ResolvedConsultPostDisplay {
  post: ConsultPost;
  replyReady: boolean;
  reply?: SampleReply;
  authorLabel: string;
}

/**
 * Chuẩn hóa bài hỏi đáp theo ngôn ngữ hiển thị (dịch các bài mẫu seed, giữ nguyên bài người dùng nhập).
 */
export function resolveConsultPostForDisplay(
  rawPost: ConsultPost,
  language: AppLanguage,
  nowMs: number = Date.now()
): ResolvedConsultPostDisplay {
  const bundle = language === 'en' ? consultContentEn : consultContentVi;
  const localizedSeed = rawPost.isSampleSeed
    ? bundle.seedPosts.find((item) => item.id === rawPost.id)
    : undefined;
  const post = localizedSeed ?? rawPost;

  const authorLabel = post.isAnonymous
    ? language === 'en'
      ? 'A fellow student'
      : 'Một bạn sinh viên'
    : post.authorName;

  const replyReady = isSampleReplyReady(post, nowMs);
  const reply = post.sampleReply
    ? post.sampleReply
    : replyReady
      ? buildSampleReplyForTopic(
          post.topic,
          language,
          post.replyReadyAt ?? new Date(nowMs).toISOString()
        )
      : undefined;

  return {
    post,
    replyReady,
    reply,
    authorLabel,
  };
}

function buildSampleReplyForTopic(
  topic: ConsultTopic,
  language: AppLanguage,
  repliedAtIso: string
): SampleReply {
  const bundle = language === 'en' ? consultContentEn : consultContentVi;
  const template = bundle.replyTemplatesByTopic[topic];
  return {
    counselorId: template.counselorId,
    counselorName: template.counselorName,
    content: template.content,
    suggestedExerciseId: template.suggestedExerciseId,
    repliedAt: repliedAtIso,
  };
}

function applyReadyRepliesToState(
  nowMs: number,
  language: AppLanguage
): { posts: ConsultPost[]; newlyReplied: ConsultPost[] } {
  const newlyReplied: ConsultPost[] = [];
  const nextState = updateStorageState((prev) => {
    let changed = false;
    const updatedPosts = prev.consultPosts.map((post) => {
      if (!post.sampleReply && post.replyReadyAt && isSampleReplyReady(post, nowMs)) {
        changed = true;
        const repliedPost: ConsultPost = {
          ...post,
          sampleReply: buildSampleReplyForTopic(
            post.topic,
            language,
            new Date(nowMs).toISOString()
          ),
        };
        newlyReplied.push(repliedPost);
        return repliedPost;
      }
      return post;
    });

    if (!changed) {
      return prev;
    }

    return {
      ...prev,
      consultPosts: updatedPosts,
    };
  });

  return {
    posts: [...nextState.consultPosts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    newlyReplied,
  };
}

export const consultService: IConsultService = {
  async getPosts(nowMs = Date.now()) {
    await waitSimulatedDelay();
    const currentLang = readStorageState().language;
    const { posts } = applyReadyRepliesToState(nowMs, currentLang);
    return posts;
  },

  async createPost(input) {
    await waitSimulatedDelay();
    const nowMs = Date.now();
    const createdAt = new Date(nowMs).toISOString();
    const id = `post-${nowMs}-${Math.random().toString(36).slice(2, 7)}`;
    const delayMs = computeSampleReplyDelayMs(`${id}:${input.title}:${input.content}`);
    const replyReadyAt = new Date(nowMs + delayMs).toISOString();
    const lang = input.language ?? readStorageState().language;

    const newPost: ConsultPost = {
      id,
      title: input.title.trim(),
      content: input.content.trim(),
      topic: input.topic,
      isAnonymous: input.isAnonymous,
      authorName: input.isAnonymous
        ? lang === 'en'
          ? 'A fellow student'
          : 'Một bạn sinh viên'
        : (input.authorName?.trim() || (lang === 'en' ? 'A fellow student' : 'Một bạn sinh viên')),
      isMine: true,
      createdAt,
      replyReadyAt,
    };

    updateStorageState((prev) => ({
      ...prev,
      consultPosts: [newPost, ...prev.consultPosts],
    }));

    return newPost;
  },

  async resolveReadyReplies(nowMs = Date.now(), language) {
    const lang = language ?? readStorageState().language;
    const { newlyReplied } = applyReadyRepliesToState(nowMs, lang);
    return newlyReplied;
  },

  async deletePost(id) {
    await waitSimulatedDelay();
    updateStorageState((prev) => ({
      ...prev,
      consultPosts: prev.consultPosts.filter((post) => !(post.id === id && post.isMine)),
    }));
  },
};
