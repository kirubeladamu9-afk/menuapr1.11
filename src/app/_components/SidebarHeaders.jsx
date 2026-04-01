"use client";

import { useLanguage } from "@common/LanguageContext";

export function SidebarHeaders() {
  const { t } = useLanguage();

  return {
    search: t('sidebar.search'),
    categories: t('sidebar.categories'),
    archives: t('sidebar.archives'),
    authors: t('sidebar.authors'),
    keywords: t('sidebar.keywords'),
  };
}
