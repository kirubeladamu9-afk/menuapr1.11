"use client";

import { useState, useEffect } from "react";
import CartData from "@data/cart.json";

const ProductButtons = () => {
  const [cartTotal, setCartTotal] = useState(CartData.total);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cartNumberEl = document.querySelector('.sb-cart-number');
    if (cartNumberEl) {
      cartNumberEl.innerHTML = cartTotal;
    }
  }, [cartTotal]);

  const addToCart = (e) => {
    e.preventDefault();
    const cartNumberEl = document.querySelector('.sb-cart-number');
    setCartTotal(cartTotal + quantity);

    if (cartNumberEl) {
      cartNumberEl.classList.add('sb-added');
      e.currentTarget.classList.add('sb-added');

      setTimeout(() => {
        cartNumberEl.classList.remove('sb-added');
      }, 600);
    }
  }

  return (
    <div className="sb-card-buttons-frame sb-mb-30">
      <a href="#." className="sb-btn sb-atc" onClick={(e) => addToCart(e)}>
        <span className="sb-icon">
          <img src="/img/ui/icons/cart.svg" alt="icon" />
        </span>
        <span className="sb-add-to-cart-text">Order Now</span>
        <span className="sb-added-text">Added</span>
      </a>
    </div>
  );
};
export default ProductButtons;
