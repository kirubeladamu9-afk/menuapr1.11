"use client";

import React, { useState } from "react";
import MenuData from "@data/menu.json";
import ContactData from "@data/sections/contact-info.json";
import QrMenuGrid from "@components/menu/QrMenuGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";

const QrMenu = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryChange = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="qr-menu-container">
      {/* Header Section */}
      <div className="qr-menu-header">
        <h1 className="qr-menu-title">Our Menu</h1>
        <p className="qr-menu-subtitle">Browse our delicious offerings</p>
      </div>

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
          {MenuData.categories.map((category, idx) => (
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
        {MenuData.categories[activeCategory] && (
          <section className="qr-category-section">
            <div className="qr-category-header">
              <h2 className="qr-category-title">
                {MenuData.categories[activeCategory].name}
              </h2>
              {MenuData.categories[activeCategory].description && (
                <p
                  className="qr-category-description"
                  dangerouslySetInnerHTML={{
                    __html:
                      MenuData.categories[activeCategory].description,
                  }}
                />
              )}
            </div>
            <QrMenuGrid
              items={MenuData.categories[activeCategory].items}
            />
          </section>
        )}
      </div>

      {/* Contact Section */}
      <div className="qr-contact-section">
        <h2 className="qr-contact-title">Contact Us</h2>
        <div className="qr-contact-items">
          {ContactData.items.map((item, idx) => (
            <div className="qr-contact-item" key={`contact-${idx}`}>
              <h3 className="qr-contact-item-title">{item.title}</h3>
              <p className="qr-contact-item-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QrMenu;
