"use client";

import Link from "next/link";
import { useLanguage } from "@common/LanguageContext";
import SearchBarModule from "@components/SearchBar";
import { Suspense } from "react";

export function SidebarContent({ categories, archives, authors, tags }) {
  const { t } = useLanguage();

  return (
    <>
      {/* sidebar */}
      <div className="sb-sidebar">
        <div className="sb-ib-title-frame sb-mb-30">
          <h4>{t('sidebar.search')}</h4>
          <i className="fas fa-arrow-down" />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBarModule />
        </Suspense>

        <div className="sb-ib-title-frame sb-mb-30">
          <h4>{t('sidebar.categories')}</h4>
          <i className="fas fa-arrow-down" />
        </div>
        <ul className="sb-list sb-mb-30">
          {categories.map((item, key) => (
            <li key={`sidebar-categories-item-${key}`}>
              <b>
                <Link href={`/blog/category/${item.id}`}>{item.title}</Link>
              </b>
            </li>
          ))}
        </ul>

        <div className="sb-ib-title-frame sb-mb-30">
          <h4>{t('sidebar.archives')}</h4>
          <i className="fas fa-arrow-down" />
        </div>
        <ul className="sb-list sb-mb-30">
          {archives.map((item, key) => (
            <li key={`sidebar-archives-item-${key}`}>
              <b>
                <Link href={`/blog/archive/${item.id}`}>
                  {item.month}, {item.year}
                </Link>
              </b>
            </li>
          ))}
        </ul>

        <div className="sb-ib-title-frame sb-mb-30">
          <h4>{t('sidebar.authors')}</h4>
          <i className="fas fa-arrow-down" />
        </div>
        <ul className="sb-list sb-mb-30">
          {authors.map((item, key) => (
            <li key={`sidebar-author-item-${key}`}>
              <b>
                <Link href={`/blog/author/${item.id}`}>{item.title}</Link>
              </b>
            </li>
          ))}
        </ul>

        <div className="sb-ib-title-frame sb-mb-30">
          <h4>{t('sidebar.keywords')}</h4>
          <i className="fas fa-arrow-down" />
        </div>
        <ul className="sb-keywords">
          {tags.map((item, key) => (
            <li key={`sidebar-tags-item-${key}`}>
              <Link href={`/blog/tag/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* sidebar end */}
    </>
  );
}
