"use client";

import { useState } from "react";
import ComingSoonModal from "@components/modals/ComingSoonModal";

const ProductButtons = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleOrderNow = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <>
      <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />
      <div className="sb-card-buttons-frame sb-mb-30">
        <a href="#." className="sb-btn sb-atc" onClick={handleOrderNow}>
          <span className="sb-icon">
            <img src="/img/ui/icons/cart.svg" alt="icon" />
          </span>
          <span className="sb-add-to-cart-text">Order Now</span>
        </a>
      </div>
    </>
  );
};
export default ProductButtons;
