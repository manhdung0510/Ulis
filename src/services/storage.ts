import { STORAGE_KEY } from '@/config/app';
import type { ConsultPost, HoaStorageState } from '@/types/domain';

let memoryState: HoaStorageState | null = null;
let usingMemoryFallback = false;
let seedPostsProvider: () => ConsultPost[] = () => [];

export function registerConsultSeedProvider(provider: () => ConsultPost[]): void {
  seedPostsProvider = provider;
}

export function createInitialState(seedPosts: ConsultPost[] = seedPostsProvider()): HoaStorageState {
  return {
    version: 1,
    language: 'vi',
    onboardingDismissed: false,
    moodCheckins: [],
    exerciseEntries: [],
    exerciseDrafts: {},
    consultPosts: seedPosts,
    appointments: [],
  };
}

/**
 * Hàm migrate dữ liệu cũ hoặc thiếu trường sang schema phiên bản 1 hiện tại.
 */
export function migrateStorageState(raw: unknown): HoaStorageState {
  const base = createInitialState();
  if (!raw || typeof raw !== 'object') {
    return base;
  }

  const record = raw as Record<string, unknown>;
  const language = record.language === 'en' ? 'en' : 'vi';
  const onboardingDismissed = Boolean(record.onboardingDismissed);

  const moodCheckins = Array.isArray(record.moodCheckins) ? record.moodCheckins : [];
  const exerciseEntries = Array.isArray(record.exerciseEntries) ? record.exerciseEntries : [];
  const exerciseDrafts =
    record.exerciseDrafts && typeof record.exerciseDrafts === 'object'
      ? (record.exerciseDrafts as HoaStorageState['exerciseDrafts'])
      : {};
  const consultPosts = Array.isArray(record.consultPosts) && record.consultPosts.length > 0
    ? record.consultPosts
    : base.consultPosts;
  const appointments = Array.isArray(record.appointments) ? record.appointments : [];

  return {
    version: 1,
    language,
    onboardingDismissed,
    moodCheckins: moodCheckins as HoaStorageState['moodCheckins'],
    exerciseEntries: exerciseEntries as HoaStorageState['exerciseEntries'],
    exerciseDrafts,
    consultPosts: consultPosts as HoaStorageState['consultPosts'],
    appointments: appointments as HoaStorageState['appointments'],
  };
}

export function isUsingMemoryFallback(): boolean {
  return usingMemoryFallback;
}

export function readStorageState(): HoaStorageState {
  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    usingMemoryFallback = false;
    if (!serialized) {
      const initial = createInitialState();
      writeStorageState(initial);
      return initial;
    }
    const parsed: unknown = JSON.parse(serialized);
    const migrated = migrateStorageState(parsed);
    memoryState = migrated;
    return migrated;
  } catch {
    usingMemoryFallback = true;
    if (!memoryState) {
      memoryState = createInitialState();
    }
    return memoryState;
  }
}

export function writeStorageState(nextState: HoaStorageState): void {
  memoryState = nextState;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    usingMemoryFallback = false;
  } catch {
    usingMemoryFallback = true;
  }
}

export function updateStorageState(
  updater: (prev: HoaStorageState) => HoaStorageState
): HoaStorageState {
  const current = readStorageState();
  const next = updater(current);
  writeStorageState(next);
  return next;
}

/**
 * Xóa toàn bộ dữ liệu người dùng và khôi phục phần dữ liệu mẫu của cổng tham vấn.
 */
export function clearAllUserDataInStorage(): HoaStorageState {
  const currentLang = readStorageState().language;
  const freshState: HoaStorageState = {
    ...createInitialState(seedPostsProvider()),
    language: currentLang,
    onboardingDismissed: true,
  };
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(freshState));
    usingMemoryFallback = false;
  } catch {
    usingMemoryFallback = true;
  }
  memoryState = freshState;
  return freshState;
}
