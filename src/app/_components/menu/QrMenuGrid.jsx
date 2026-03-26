"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const QrMenuGrid = ({ items }) => {
  const [img, setImg] = useState(false);
  const [imgValue, setImgValue] = useState([]);

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
    </>
  );
};

export default QrMenuGrid;
