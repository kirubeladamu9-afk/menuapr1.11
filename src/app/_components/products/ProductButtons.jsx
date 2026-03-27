"use client";

import { useState, useEffect } from "react";

import CartData from "@data/cart.json";

const ProductButtons = ({ selectedAddOns = [] }) => {
  const [cartTotal, setCartTotal] = useState(CartData.total);
  const [quantity, setQuantity] = useState(1);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const minQuantity = 1;
  const maxQuantity = 10;

  useEffect(() => {
    const cartNumberEl = document.querySelector('.sb-cart-number');
    cartNumberEl.innerHTML = cartTotal;
  }, [cartTotal]);

  const addToOrder = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  }

  return (
    <>
      <div className="sb-buttons-frame">
        <div className="sb-input-number-frame">
            <div className="sb-input-number-btn sb-sub" onClick={() => setQuantity(quantity>minQuantity ? quantity-1 : quantity)}>-</div>
            <input type="number" readOnly value={quantity} min={minQuantity} max={maxQuantity} />
            <div className="sb-input-number-btn sb-add" onClick={() => setQuantity(quantity<maxQuantity ? quantity+1 : quantity)}>+</div>
        </div>
        {/* button */}
        <a href="#." className="sb-btn sb-atc" onClick={(e) => addToOrder(e) }>
            <span className="sb-icon">
                <img src="/img/ui/icons/cart.svg" alt="icon" />
            </span>
            <span className="sb-add-to-cart-text">Add to order</span>
            <span className="sb-added-text">Added</span>
        </a>
        {/* button end */}
      </div>

      {showComingSoon && (
        <div className="qr-coming-soon-overlay" onClick={() => setShowComingSoon(false)}>
          <div className="qr-coming-soon-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="qr-coming-soon-close"
              onClick={() => setShowComingSoon(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="qr-coming-soon-content">
              <h2>Coming Soon</h2>
              <p>Online ordering will be available soon. For now, please contact us directly to place your order.</p>
            </div>
            <div className="qr-coming-soon-actions">
              <button
                className="qr-coming-soon-btn qr-coming-soon-primary"
                onClick={() => {
                  window.location.href = "tel:+251919747309";
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
      )}
    </>
  );
};
export default ProductButtons;
