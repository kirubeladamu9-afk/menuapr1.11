'use client';

import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export function LanguageAttributeHandler() {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  return null;
}
