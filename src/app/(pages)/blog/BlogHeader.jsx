"use client";

import { useLanguage } from "@common/LanguageContext";

export function BlogHeader() {
  const { t } = useLanguage();

  return (
    <div className="sb-mb-60">
      <h2 className="sb-cate-title sb-mb-30">
        Latest <span>publications</span>
      </h2>
      <p className="sb-text">
        Consectetur numquam poro nemo veniam
        <br />
        eligendi rem adipisci quo modi.
      </p>
    </div>
  );
}
