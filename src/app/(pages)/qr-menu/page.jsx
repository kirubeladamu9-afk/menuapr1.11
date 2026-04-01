"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import MenuData from "@data/menu.json";
import ContactData from "@data/sections/contact-info.json";
import QrMenuGrid from "@components/menu/QrMenuGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper";
import { useLanguage } from "@common/LanguageContext";
import { useTranslatedMenu } from "@common/useTranslatedMenu";
import "swiper/css";

const QrMenuContent = () => {
  const { t } = useLanguage();
  const { getTranslatedMenuData } = useTranslatedMenu();
  const searchParams = useSearchParams();

  const translatedMenuData = useMemo(() => {
    return getTranslatedMenuData();
  }, [getTranslatedMenuData]);
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(categoryParam ? parseInt(categoryParam) : 0);
  const heroSlides = useMemo(() =>
    translatedMenuData.categories.map((category) => category.items[0]).filter(Boolean).slice(0, 4),
    [translatedMenuData]
  );

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(parseInt(categoryParam));
    }
  }, [categoryParam]);

  const handleCategoryChange = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="qr-menu-container">
      {/* Hero Section */}
      <section className="qr-hero-section">
        <div className="qr-hero-layout">
          <div className="qr-hero-copy">
            <span className="qr-hero-eyebrow">{t('qrMenu.eyebrow')}</span>
            <p className="qr-hero-text">
              {t('qrMenu.title')}
            </p>
          </div>

          <div className="qr-hero-slider-frame">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              loop={true}
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="qr-hero-swiper"
            >
              {heroSlides.map((item, idx) => (
                <SwiperSlide key={`hero-slide-${idx}`} className="qr-hero-slide">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="qr-hero-slide-image"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                  <div className="qr-hero-slide-overlay">
                    <span className="qr-hero-slide-tag">{t('qrMenu.eyebrow')}</span>
                    <h2 className="qr-hero-slide-title">{item.title}</h2>
                    <p className="qr-hero-slide-text">{item.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Category Tabs Swiper */}
      <div className="qr-category-tabs">
        <Swiper
          modules={[FreeMode, Navigation]}
          slidesPerView="auto"
          spaceBetween={12}
          freeMode={true}
          grabCursor={true}
          preventClicks={false}
          preventClicksPropagation={false}
          className="qr-tabs-swiper"
        >
          {translatedMenuData.categories.map((category, idx) => (
            <SwiperSlide key={`tab-${idx}`} className="qr-tab-slide">
              <button
                className={`qr-category-tab ${
                  activeCategory === idx ? "qr-active" : ""
                }`}
                onClick={() => handleCategoryChange(idx)}
                type="button"
              >
                {category.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Menu Content */}
      <div className="qr-menu-content">
        {translatedMenuData.categories[activeCategory] && (
          <section className="qr-category-section">
            <div className="qr-category-header">
              <h2 className="qr-category-title">
                {translatedMenuData.categories[activeCategory].name}
              </h2>
              {translatedMenuData.categories[activeCategory].description && (
                <p
                  className="qr-category-description"
                  dangerouslySetInnerHTML={{
                    __html:
                      translatedMenuData.categories[activeCategory].description,
                  }}
                />
              )}
            </div>
            <QrMenuGrid
              items={translatedMenuData.categories[activeCategory].items}
            />
          </section>
        )}
      </div>

      {/* Contact Section */}
      <div className="qr-contact-section">
        <h2 className="qr-contact-title">{t('qrMenu.contact')}</h2>
        <div className="qr-contact-items">
          {ContactData.items.map((item, idx) => (
            <div className="qr-contact-item" key={`contact-${idx}`}>
              <h3 className="qr-contact-item-title">{t(`qrMenu.${item.title.toLowerCase()}`)}</h3>
              <p className="qr-contact-item-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const QrMenu = () => {
  return (
    <Suspense fallback={<div className="container"><p>Loading menu...</p></div>}>
      <QrMenuContent />
    </Suspense>
  );
};

export const dynamic = "force-dynamic";

export default QrMenu;
