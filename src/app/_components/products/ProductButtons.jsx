"use client";

import { useState } from "react";

const ProductButtons = ({ selectedAddOns = [] }) => {
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const maxQuantity = 10;

  return (
    <>
      <div className="sb-buttons-frame">
        <div className="sb-input-number-frame">
            <div className="sb-input-number-btn sb-sub" onClick={() => setQuantity(quantity>minQuantity ? quantity-1 : quantity)}>-</div>
            <input type="number" readOnly value={quantity} min={minQuantity} max={maxQuantity} />
            <div className="sb-input-number-btn sb-add" onClick={() => setQuantity(quantity<maxQuantity ? quantity+1 : quantity)}>+</div>
        </div>
      </div>

    </>
  );
};
export default ProductButtons;
