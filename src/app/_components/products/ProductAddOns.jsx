"use client";

import { useState } from "react";

const ProductAddOns = ({ selectedAddOns, setSelectedAddOns, ingredients }) => {
  const toggleAddOn = (ingredient) => {
    setSelectedAddOns((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.label === ingredient.label);
      if (isSelected) {
        return prevSelected.filter((item) => item.label !== ingredient.label);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  return (
    <div className="sb-addons-section sb-mb-30">
      <h4 className="sb-addons-title sb-mb-20">Add Extra Ingredients</h4>
      <div className="sb-addons-list">
        {ingredients.map((ingredient, idx) => (
          <label key={`addon-${idx}`} className="sb-addon-item">
            <input
              type="checkbox"
              checked={selectedAddOns.some((item) => item.label === ingredient.label)}
              onChange={() => toggleAddOn(ingredient)}
              className="sb-addon-checkbox"
            />
            <span className="sb-addon-label">{ingredient.label}</span>
            <span className="sb-addon-value">({ingredient.value})</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProductAddOns;
