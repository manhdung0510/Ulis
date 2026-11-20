export type AppLanguage = 'vi' | 'en';

export type ContentStatus = 'placeholder' | 'final' | 'draft-needs-review';

export type EmotionId =
  | 'peaceful'
  | 'joyful'
  | 'anxious'
  | 'stressed'
  | 'sad'
  | 'angry'
  | 'tired'
  | 'confused';

export type IntensityLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodCheckin {
  id: string;
  dateKey: string;
  emotion: EmotionId;
  intensity: IntensityLevel;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export type ExerciseId =
  | 'thought-record'
  | 'distortion-spotter'
  | 'thought-reframing'
  | 'emotion-awareness';

export interface EmotionStepValue {
  emotion: EmotionId;
  intensity: IntensityLevel;
}

export type ExerciseAnswerValue = string | string[] | number | EmotionStepValue;

export type ExerciseAnswers = Record<string, ExerciseAnswerValue>;

export interface ExerciseSummary {
  initialThought?: string;
  balancedThought?: string;
  emotionBefore?: EmotionStepValue;
  emotionAfter?: number;
  distortionIds?: string[];
  emotionGroup?: string;
  emotionWords?: string[];
  bodySensations?: string[];
  summarySentence?: string;
}

export interface ExerciseEntry {
  id: string;
  exerciseId: ExerciseId;
  answers: ExerciseAnswers;
  summary: ExerciseSummary;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseDraft {
  exerciseId: ExerciseId;
  currentStepIndex: number;
  answers: ExerciseAnswers;
  updatedAt: string;
}

export type ConsultTopic =
  | 'study'
  | 'relationships'
  | 'anxiety-stress'
  | 'family'
  | 'other';

export interface SampleReply {
  counselorId: string;
  counselorName: string;
  content: string;
  suggestedExerciseId?: ExerciseId;
  repliedAt: string;
}

export interface ConsultPost {
  id: string;
  title: string;
  content: string;
  topic: ConsultTopic;
  isAnonymous: boolean;
  authorName: string;
  isMine: boolean;
  isSampleSeed?: boolean;
  createdAt: string;
  replyReadyAt?: string;
  sampleReply?: SampleReply;
}

export type ConsultFormat = 'in-person' | 'online';

export interface CounselorProfile {
  id: string;
  name: string;
  title: string;
  initials: string;
  avatarTone: 'primary' | 'secondary' | 'sand';
  focusAreas: string[];
  formats: ConsultFormat[];
  bio: string;
  status: ContentStatus;
}

export interface TimeSlotOption {
  time: string;
  status: 'available' | 'full' | 'booked-by-me';
}

export interface Appointment {
  id: string;
  referenceCode: string;
  counselorId: string;
  counselorName: string;
  dateKey: string;
  slotTime: string;
  format: ConsultFormat;
  topic: ConsultTopic;
  studentName: string;
  contact: string;
  note?: string;
  status: 'upcoming' | 'cancelled';
  createdAt: string;
}

export interface HoaStorageState {
  version: 1;
  language: AppLanguage;
  onboardingDismissed: boolean;
  moodCheckins: MoodCheckin[];
  exerciseEntries: ExerciseEntry[];
  exerciseDrafts: Partial<Record<ExerciseId, ExerciseDraft>>;
  consultPosts: ConsultPost[];
  appointments: Appointment[];
}
