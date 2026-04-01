'use client';

import { useLanguage } from "@common/LanguageContext";
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { language, switchLanguage, mounted } = useLanguage();

  if (!mounted) {
    return null;
  }

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => switchLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="lang-divider">|</span>
      <button
        className={`lang-btn ${language === 'am' ? 'active' : ''}`}
        onClick={() => switchLanguage('am')}
        aria-label="Switch to Amharic"
      >
        AM
      </button>
    </div>
  );
}
