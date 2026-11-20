import { describe, expect, it } from 'vitest';
import { vi } from '@/i18n/vi';
import { en } from '@/i18n/en';
import { getContrastRatio } from '@/utils/contrast';
import {
  clearAllUserDataInStorage,
  isUsingMemoryFallback,
  migrateStorageState,
  readStorageState,
  writeStorageState,
} from '@/services/storage';

function collectKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...collectKeys(v as Record<string, unknown>, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

describe('i18n parity', () => {
  it('has identical translation keys between vi and en', () => {
    const viKeys = collectKeys(vi as unknown as Record<string, unknown>);
    const enKeys = collectKeys(en as unknown as Record<string, unknown>);
    expect(enKeys).toEqual(viKeys);
  });
});

describe('design token contrast (WCAG AA)', () => {
  it('meets contrast >= 4.5:1 for normal text and >= 3:1 for UI borders', () => {
    expect(getContrastRatio('#2B2623', '#FAF6EF')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#2B2623', '#F0E8DA')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#5C534D', '#FAF6EF')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#5C534D', '#F0E8DA')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#A24A30', '#FAF6EF')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#FFFDF9', '#A24A30')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#3A5A4B', '#FAF6EF')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#FFFDF9', '#3A5A4B')).toBeGreaterThanOrEqual(4.5);
    expect(getContrastRatio('#8A7E72', '#FAF6EF')).toBeGreaterThanOrEqual(3.0);
  });
});

describe('storage migration and memory fallback', () => {
  it('migrates partial/invalid objects cleanly to v1 schema', () => {
    const empty = migrateStorageState(null);
    expect(empty.version).toBe(1);
    expect(empty.language).toBe('vi');

    const partial = migrateStorageState({ language: 'en', onboardingDismissed: true });
    expect(partial.language).toBe('en');
    expect(partial.onboardingDismissed).toBe(true);
    expect(Array.isArray(partial.moodCheckins)).toBe(true);
  });

  it('falls back to in-memory storage when localStorage throws', () => {
    const originalGetItem = Storage.prototype.getItem;
    const originalSetItem = Storage.prototype.setItem;

    Storage.prototype.getItem = () => {
      throw new Error('Private browsing');
    };
    Storage.prototype.setItem = () => {
      throw new Error('Private browsing');
    };

    try {
      const state = readStorageState();
      expect(isUsingMemoryFallback()).toBe(true);
      writeStorageState({ ...state, onboardingDismissed: true });
      expect(readStorageState().onboardingDismissed).toBe(true);
    } finally {
      Storage.prototype.getItem = originalGetItem;
      Storage.prototype.setItem = originalSetItem;
      clearAllUserDataInStorage();
    }
  });
});
