"use client";

import React from "react";
import dynamic from "next/dynamic";

import AppData from "@data/app.json";
import GalleryData from "@data/gallery.json";

import PageBanner from "@components/PageBanner";
import CallToActionSection from "@components/sections/CallToAction";
import { useLanguage } from "@common/LanguageContext";

const GalleryMasonry = dynamic( () => import("@components/gallery/GalleryMasonry"), { ssr: false } );

const Gallery1 = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner pageTitle={t('pages.gallery')} breadTitle={t('pages.galleryTitle')} type={1} />
      
      {/* gallery */}
      <div className="sb-p-90-60">
        <div className="container">
          <GalleryMasonry items={GalleryData.items} layout={1} />

          <div>
            <ul className="sb-pagination">
              <li className="sb-active"><a href="#.">1</a></li>
              <li><a href="#.">2</a></li>
              <li><a href="#.">3</a></li>
              <li><a href="#.">4</a></li>
              <li><a href="#.">...</a></li>
            </ul>
          </div>
        </div>
        
      </div>
      {/* gallery end */}

      <CallToActionSection />
    </>
  );
};
export default Gallery1;
