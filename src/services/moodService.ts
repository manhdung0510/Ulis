import { FEATURES } from '@/config/features';
import { checkinContentVi } from '@/content/vi/checkin';
import type { EmotionId, ExerciseId, IntensityLevel, MoodCheckin } from '@/types/domain';
import { addDaysDateKey, getDateKeyInAppTz } from '@/utils/date';
import { waitSimulatedDelay } from './delay';
import { readStorageState, updateStorageState } from './storage';

export interface SaveMoodCheckinInput {
  emotion: EmotionId;
  intensity: IntensityLevel;
  note?: string;
}

export interface IMoodService {
  getAll(): Promise<MoodCheckin[]>;
  getToday(): Promise<MoodCheckin | null>;
  getRecent(days?: number): Promise<MoodCheckin[]>;
  saveToday(input: SaveMoodCheckinInput): Promise<MoodCheckin>;
  deleteById(id: string): Promise<void>;
}

/**
 * Ánh xạ cảm xúc sang danh sách bài tập gợi ý, có lọc theo cờ tính năng emotionExercise.
 */
export function getSuggestedExercisesForEmotion(
  emotion: EmotionId,
  emotionExerciseEnabled: boolean = FEATURES.emotionExercise
): ExerciseId[] {
  const mapped = checkinContentVi.moodToExercises[emotion] ?? [];
  if (emotionExerciseEnabled) {
    return mapped;
  }
  return mapped.filter((id) => id !== 'emotion-awareness');
}

export const moodService: IMoodService = {
  async getAll() {
    await waitSimulatedDelay();
    const state = readStorageState();
    return [...state.moodCheckins].sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  },

  async getToday() {
    await waitSimulatedDelay();
    const todayKey = getDateKeyInAppTz();
    const state = readStorageState();
    return state.moodCheckins.find((item) => item.dateKey === todayKey) ?? null;
  },

  async getRecent(days = 7) {
    await waitSimulatedDelay();
    const state = readStorageState();
    const cutoffKey = addDaysDateKey(new Date(), -(days - 1));
    return state.moodCheckins
      .filter((item) => item.dateKey >= cutoffKey)
      .sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  },

  async saveToday(input) {
    await waitSimulatedDelay();
    const nowIso = new Date().toISOString();
    const todayKey = getDateKeyInAppTz();
    const trimmedNote = input.note?.trim() || undefined;

    let savedRecord: MoodCheckin | null = null;
    updateStorageState((prev) => {
      const existing = prev.moodCheckins.find((item) => item.dateKey === todayKey);
      if (existing) {
        savedRecord = {
          ...existing,
          emotion: input.emotion,
          intensity: input.intensity,
          note: trimmedNote,
          updatedAt: nowIso,
        };
        return {
          ...prev,
          moodCheckins: prev.moodCheckins.map((item) =>
            item.dateKey === todayKey ? savedRecord! : item
          ),
        };
      }

      savedRecord = {
        id: `mood-${todayKey}-${Math.random().toString(36).slice(2, 7)}`,
        dateKey: todayKey,
        emotion: input.emotion,
        intensity: input.intensity,
        note: trimmedNote,
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      return {
        ...prev,
        moodCheckins: [savedRecord, ...prev.moodCheckins],
      };
    });

    if (!savedRecord) {
      throw new Error('Could not save mood check-in');
    }
    return savedRecord;
  },

  async deleteById(id) {
    await waitSimulatedDelay();
    updateStorageState((prev) => ({
      ...prev,
      moodCheckins: prev.moodCheckins.filter((item) => item.id !== id),
    }));
  },
};
