import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getSuggestedExercisesForEmotion, moodService } from '@/services/moodService';
import { resetSimulatedDelayRange, setSimulatedDelayRange } from '@/services/delay';
import { clearAllUserDataInStorage } from '@/services/storage';

describe('mood mapping and check-in service', () => {
  beforeEach(() => {
    setSimulatedDelayRange(0, 0);
    clearAllUserDataInStorage();
  });

  afterEach(() => {
    resetSimulatedDelayRange();
  });

  it('maps emotions to exercises and filters out emotion-awareness when feature flag is off', () => {
    expect(getSuggestedExercisesForEmotion('anxious', true)).toEqual([
      'thought-record',
      'distortion-spotter',
    ]);
    expect(getSuggestedExercisesForEmotion('sad', true)).toEqual([
      'thought-reframing',
      'emotion-awareness',
    ]);
    expect(getSuggestedExercisesForEmotion('sad', false)).toEqual(['thought-reframing']);
    expect(getSuggestedExercisesForEmotion('tired', true)).toEqual(['emotion-awareness']);
    expect(getSuggestedExercisesForEmotion('tired', false)).toEqual([]);
  });

  it('overwrites today check-in instead of duplicating records for the same date', async () => {
    const first = await moodService.saveToday({
      emotion: 'anxious',
      intensity: 4,
      note: 'Trước giờ thuyết trình',
    });
    const second = await moodService.saveToday({
      emotion: 'peaceful',
      intensity: 2,
      note: 'Đã xong phần nói',
    });

    expect(second.id).toBe(first.id);
    expect(second.emotion).toBe('peaceful');
    expect(second.intensity).toBe(2);

    const all = await moodService.getAll();
    expect(all).toHaveLength(1);
    expect(all[0]?.note).toBe('Đã xong phần nói');
  });
});
