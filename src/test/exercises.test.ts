import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  buildExerciseSummary,
  getExerciseDefinition,
} from '@/features/exercises/definitions/exerciseDefinitions';
import { resetSimulatedDelayRange, setSimulatedDelayRange } from '@/services/delay';
import { journalService } from '@/services/journalService';
import { clearAllUserDataInStorage } from '@/services/storage';

describe('exercise definitions, drafts, and journal service', () => {
  beforeEach(() => {
    setSimulatedDelayRange(0, 0);
    clearAllUserDataInStorage();
  });

  afterEach(() => {
    resetSimulatedDelayRange();
  });

  it('provides structured steps for all 4 exercises in both VI and EN', () => {
    expect(getExerciseDefinition('thought-record', 'vi').steps).toHaveLength(5);
    expect(getExerciseDefinition('distortion-spotter', 'en').steps).toHaveLength(3);
    expect(getExerciseDefinition('thought-reframing', 'vi').steps).toHaveLength(4);
    expect(getExerciseDefinition('emotion-awareness', 'en').steps).toHaveLength(4);
  });

  it('builds balanced summary and clears draft upon saving to journal', async () => {
    journalService.saveDraft({
      exerciseId: 'thought-record',
      currentStepIndex: 2,
      answers: {
        situation: 'Trước giờ thuyết trình nhóm môn tiếng Anh',
        initialThought: 'Mình sẽ quên hết bài mất',
      },
      updatedAt: new Date().toISOString(),
    });
    expect(journalService.getDraft('thought-record')?.currentStepIndex).toBe(2);

    const answers = {
      situation: 'Trước giờ thuyết trình nhóm môn tiếng Anh',
      initialThought: 'Mình sẽ quên hết bài mất',
      emotionBefore: { emotion: 'anxious' as const, intensity: 4 as const },
      distortionIds: ['jumping-to-conclusions'],
      evidenceAgainst: 'Mình đã chuẩn bị thẻ ghi chú và tập thử hai lần',
      balancedThought: 'Mình có thể hồi hộp lúc đầu nhưng vẫn bám theo thẻ ý chính được',
      emotionAfter: 2,
    };

    const summary = buildExerciseSummary('thought-record', answers, 'vi');
    expect(summary.initialThought).toBe('Mình sẽ quên hết bài mất');
    expect(summary.balancedThought).toContain('thẻ ý chính');
    expect(summary.emotionBefore?.intensity).toBe(4);
    expect(summary.emotionAfter).toBe(2);

    const saved = await journalService.saveEntry({
      exerciseId: 'thought-record',
      answers,
      summary,
    });
    expect(saved.id).toBeTruthy();
    expect(journalService.getDraft('thought-record')).toBeNull();

    const list = await journalService.getAll();
    expect(list).toHaveLength(1);
    await journalService.deleteEntry(saved.id);
    expect(await journalService.getAll()).toHaveLength(0);
  });

  it('builds summary sentence for emotion-awareness exercise', () => {
    const summary = buildExerciseSummary(
      'emotion-awareness',
      {
        emotionGroup: 'anxious-tense',
        emotionWords: ['Hồi hộp', 'Áp lực'],
        bodySensations: ['shoulders'],
        relatedContext: 'Chuẩn bị nộp tiểu luận cuối kỳ',
      },
      'vi'
    );
    expect(summary.summarySentence).toContain('Mình đang cảm thấy hồi hộp, áp lực');
    expect(summary.summarySentence).toContain('Chuẩn bị nộp tiểu luận cuối kỳ');
  });
});
