import React from "react";
import AppData from "@data/app.json";
import MenuData from "@data/menu.json";
import ContactData from "@data/sections/contact-info.json";
import QrMenuGrid from "@components/menu/QrMenuGrid";

export const metadata = {
  title: "Menu - QR Code",
  description: AppData.settings.siteDescription,
};

const QrMenu = () => {
  return (
    <div className="qr-menu-container">
      {/* Header Section */}
      <div className="qr-menu-header">
        <div className="qr-menu-logo">
          <img src="/img/ui/logo.svg" alt="Restaurant Logo" />
        </div>
        <h1 className="qr-menu-title">Our Menu</h1>
        <p className="qr-menu-subtitle">Browse our delicious offerings</p>
      </div>

      {/* Menu Sections */}
      <div className="qr-menu-sections">
        {MenuData.categories.map((category, idx) => (
          <section className="qr-category-section" key={`category-${idx}`}>
            <div className="qr-category-header">
              <h2 className="qr-category-title">{category.name}</h2>
              {category.description && (
                <p
                  className="qr-category-description"
                  dangerouslySetInnerHTML={{ __html: category.description }}
                />
              )}
            </div>
            <QrMenuGrid items={category.items} />
          </section>
        ))}
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
