"use client";

import { useCallback, memo, useState } from "react";
import Link from "next/link";
import CartData from "@data/cart.json";
import ComingSoonModal from "@components/modals/ComingSoonModal";

const QrMenuGrid = memo(({ items }) => {
  const [cartTotal, setCartTotal] = useState(CartData.total);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const getProductUrl = useCallback((item, index) => {
    const titleForSlug = item.originalTitle || item.title;
    const slug = titleForSlug.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
    return `/product?id=${slug}&idx=${index}`;
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowComingSoon(true);
  };

  return (
    <>
      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
      <div className="qr-menu-items">
        {items.map((item, key) => (
          <div className="qr-menu-item" key={`qr-menu-item-${key}`}>
            <Link href={getProductUrl(item, key)} className="qr-item-image-link">
              <div className="qr-item-image-btn">
                <img src={item.image} alt={item.title} loading="lazy" />
                {item.badge && (
                  <div
                    className="qr-item-badge"
                    dangerouslySetInnerHTML={{ __html: item.badge }}
                  />
                )}
              </div>
            </Link>

            <div className="qr-item-content">
              <div className="qr-item-header">
                <Link href={getProductUrl(item, key)} className="qr-item-title-link">
                  <h3 className="qr-item-title">{item.title}</h3>
                </Link>
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

              <div className="qr-item-actions">
                <Link href={getProductUrl(item, key)} className="qr-item-details-btn">
                  <span className="qr-item-details-text">Details</span>
                </Link>
                <a href="#." className="qr-item-order-btn sb-atc" onClick={handleAddToCart}>
                  <span className="qr-item-order-text">Order Now</span>
                  <span className="qr-item-ordered-text">Added</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
});

export default QrMenuGrid;
