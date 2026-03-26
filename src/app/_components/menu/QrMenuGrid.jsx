"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const QrMenuGrid = ({ items }) => {
  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleImageClick = (image, title) => {
    setImg(true);
    setImgValue([{ src: image, alt: title }]);
  };

  return (
    <>
      <div className="qr-menu-items">
        {items.map((item, key) => (
          <div className="qr-menu-item" key={`qr-menu-item-${key}`}>
            <button
              className="qr-item-image-btn"
              onClick={() => handleImageClick(item.image, item.title)}
            >
              <img src={item.image} alt={item.title} />
              {item.badge && (
                <div
                  className="qr-item-badge"
                  dangerouslySetInnerHTML={{ __html: item.badge }}
                />
              )}
            </button>

            <div className="qr-item-content">
              <div className="qr-item-header">
                <h3 className="qr-item-title">{item.title}</h3>
                <div className="qr-item-price">
                  <sub>{item.currency}</sub>
                  {item.price}
                </div>
              </div>

              <p className="qr-item-description">{item.text}</p>

              {item.rating && (
                <div className="qr-item-rating">
                  <div className="qr-stars">
                    {[...Array(item.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <span>({item.rating})</span>
                </div>
              )}

              <button
                className="qr-item-cta-btn"
                onClick={() => setShowComingSoon(true)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        open={img}
        close={() => setImg(false)}
        slides={imgValue}
        styles={{ container: { backgroundColor: "rgba(38, 31, 65, .85)" } }}
        render={{
          buttonPrev: imgValue.length <= 1 ? () => null : undefined,
          buttonNext: imgValue.length <= 1 ? () => null : undefined,
        }}
      />

      {showComingSoon && (
        <div className="qr-coming-soon-overlay" onClick={() => setShowComingSoon(false)}>
          <div className="qr-coming-soon-dialog">
            <button
              className="qr-coming-soon-close"
              onClick={() => setShowComingSoon(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="qr-coming-soon-content">
              <h2>Coming Soon!</h2>
              <p>Online ordering will be available soon. For now, please contact us directly to place your order.</p>
              <div className="qr-coming-soon-actions">
                <button
                  className="qr-coming-soon-btn qr-coming-soon-primary"
                  onClick={() => {
                    window.location.href = "tel:+02(044)756-X6-52";
                    setShowComingSoon(false);
                  }}
                >
                  Call Us
                </button>
                <button
                  className="qr-coming-soon-btn qr-coming-soon-secondary"
                  onClick={() => setShowComingSoon(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QrMenuGrid;
