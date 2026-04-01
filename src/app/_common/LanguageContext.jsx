'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import en from '@data/locales/en.json';
import am from '@data/locales/am.json';

const LanguageContext = createContext();

const translations = {
  en,
  am,
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('am');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') || 'am';
    setLanguage(savedLanguage);
    setMounted(true);
  }, []);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
