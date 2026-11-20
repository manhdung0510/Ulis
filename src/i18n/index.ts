import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { vi } from './vi';
import { en } from './en';
import { readStorageState, updateStorageState } from '@/services/storage';
import type { AppLanguage } from '@/types/domain';

const initialLanguage: AppLanguage =
  typeof window !== 'undefined' ? readStorageState().language : 'vi';

function syncDocumentLang(lang: AppLanguage): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

syncDocumentLang(initialLanguage);

void i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
  },
  lng: initialLanguage,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  saveMissing: import.meta.env.DEV,
  missingKeyHandler: (_lngs, _ns, key) => {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Missing translation key: ${key}`);
    }
  },
});

export function changeAppLanguage(nextLang: AppLanguage): void {
  void i18n.changeLanguage(nextLang);
  syncDocumentLang(nextLang);
  updateStorageState((prev) => ({
    ...prev,
    language: nextLang,
  }));
}

export default i18n;
