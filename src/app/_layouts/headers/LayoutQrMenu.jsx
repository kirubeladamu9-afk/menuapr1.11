'use client';

import Link from "next/link";
import { useLanguage } from "@common/LanguageContext";

const QrMenuHeader = () => {
  const { t } = useLanguage();
  return (
    <header className="qr-menu-header-nav">
      <div className="qr-menu-header-content">
        <Link href="/qr-menu" className="qr-menu-home-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          {t('navigation.backToHome')}
        </Link>
      </div>
    </header>
  );
};

export default QrMenuHeader;
