import type {
  ExerciseAnswers,
  ExerciseDraft,
  ExerciseEntry,
  ExerciseId,
  ExerciseSummary,
} from '@/types/domain';
import { waitSimulatedDelay } from './delay';
import { readStorageState, updateStorageState } from './storage';

export interface SaveExerciseEntryInput {
  exerciseId: ExerciseId;
  answers: ExerciseAnswers;
  summary: ExerciseSummary;
}

export interface IJournalService {
  getAll(): Promise<ExerciseEntry[]>;
  getById(id: string): Promise<ExerciseEntry | null>;
  saveEntry(input: SaveExerciseEntryInput): Promise<ExerciseEntry>;
  deleteEntry(id: string): Promise<void>;
  getDraft(exerciseId: ExerciseId): ExerciseDraft | null;
  saveDraft(draft: ExerciseDraft): void;
  clearDraft(exerciseId: ExerciseId): void;
}

export const journalService: IJournalService = {
  async getAll() {
    await waitSimulatedDelay();
    const state = readStorageState();
    return [...state.exerciseEntries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getById(id) {
    await waitSimulatedDelay();
    const state = readStorageState();
    return state.exerciseEntries.find((item) => item.id === id) ?? null;
  },

  async saveEntry(input) {
    await waitSimulatedDelay();
    const nowIso = new Date().toISOString();
    const entry: ExerciseEntry = {
      id: `ex-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      exerciseId: input.exerciseId,
      answers: input.answers,
      summary: input.summary,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    updateStorageState((prev) => {
      const nextDrafts = { ...prev.exerciseDrafts };
      delete nextDrafts[input.exerciseId];
      return {
        ...prev,
        exerciseEntries: [entry, ...prev.exerciseEntries],
        exerciseDrafts: nextDrafts,
      };
    });

    return entry;
  },

  async deleteEntry(id) {
    await waitSimulatedDelay();
    updateStorageState((prev) => ({
      ...prev,
      exerciseEntries: prev.exerciseEntries.filter((item) => item.id !== id),
    }));
  },

  getDraft(exerciseId) {
    const state = readStorageState();
    return state.exerciseDrafts[exerciseId] ?? null;
  },

  saveDraft(draft) {
    updateStorageState((prev) => ({
      ...prev,
      exerciseDrafts: {
        ...prev.exerciseDrafts,
        [draft.exerciseId]: draft,
      },
    }));
  },

  clearDraft(exerciseId) {
    updateStorageState((prev) => {
      if (!prev.exerciseDrafts[exerciseId]) {
        return prev;
      }
      const nextDrafts = { ...prev.exerciseDrafts };
      delete nextDrafts[exerciseId];
      return {
        ...prev,
        exerciseDrafts: nextDrafts,
      };
    });
  },
};
