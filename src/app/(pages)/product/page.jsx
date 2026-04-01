"use client";

import React, { Suspense, useMemo } from "react";
import dynamicImport from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import AppData from "@data/app.json";
import MenuData from "@data/menu.json";
import ProductsData from "@data/products.json";

import ProductImage from "@components/products/ProductImage";
import ProductButtons from "@components/products/ProductButtons";
import { useLanguage } from "@common/LanguageContext";
import { useTranslatedMenu } from "@common/useTranslatedMenu";

const ProductsSlider = dynamicImport( () => import("@components/sliders/Products"), { ssr: false } );

const ProductContent = () => {
  const { t } = useLanguage();
  const { getTranslatedMenuData } = useTranslatedMenu();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const productIdx = searchParams.get("idx");

  const translatedMenuData = useMemo(() => {
    return getTranslatedMenuData();
  }, [getTranslatedMenuData]);

  // Find the product from translated menu data
  const currentProduct = useMemo(() => {
    if (!productId) return null;

    for (let category of translatedMenuData.categories) {
      for (let item of category.items) {
        const itemSlug = item.title.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "");
        if (itemSlug === productId) {
          return item;
        }
      }
    }
    return null;
  }, [productId, translatedMenuData]);

  // Parse ingredients from description
  const AttsData = useMemo(() => {
    if (!currentProduct) return [];

    const ingredientMatch = currentProduct.text.match(/Ingredients:\s*([^.]+)/i);
    if (ingredientMatch) {
      const ingredientText = ingredientMatch[1];
      const ingredients = ingredientText.split(",").map(ing => ing.trim()).filter(ing => ing);

      return ingredients.map((ingredient, idx) => {
        const parts = ingredient.split("–");
        return {
          label: parts[0].trim(),
          value: parts[1]?.trim() || ""
        };
      });
    }

    return [];
  }, [currentProduct]);

  const ProductAtts = () => {
    if (AttsData.length === 0) {
      return (
        <ul className="sb-list">
          <li><b>{t('menu.ui.noIngredientsListed')}</b><span></span></li>
        </ul>
      );
    }

    return (
      <ul className="sb-list">
        {AttsData.map((item, key) => (
        <li key={`product-reviews-item-${key}`}><b>{item.label}</b><span>{item.value}</span></li>
        ))}
      </ul>
    );
  };

  const tabs = [
    {
      "slug": "ingredients",
      "name": t('menu.ui.ingredients')
    }
  ];

  // Fallback to default if product not found
  if (!currentProduct) {
    return (
      <section className="sb-p-90-0 sb-product-page">
        <div className="container">
          <Link href="/qr-menu" className="sb-back-btn sb-mb-30">
            <i className="fas fa-arrow-left"></i> {t('menu.ui.backToMenu')}
          </Link>
          <p>{t('menu.ui.productNotFound')}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* product */}
      <section className="sb-p-90-0 sb-product-page">
        <div className="container">
          <Link href="/qr-menu" className="sb-back-btn sb-mb-30">
            <i className="fas fa-arrow-left"></i> {t('menu.ui.backToMenu')}
          </Link>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ProductImage src={currentProduct.image} alt={currentProduct.title} badge={currentProduct.badge || ""} />
            </div>
            <div className="col-lg-6">
              <div className="sb-product-description sb-mb-90">
                <h1 className="sb-product-title sb-mb-20">{currentProduct.title}</h1>
                <div className="sb-price-frame sb-mb-30">
                  <div className="sb-price"><sub>$</sub> {currentProduct.price}</div>
                </div>
                <ul className="sb-stars sb-mb-25">
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><span>({currentProduct.rating} ratings)</span></li>
                </ul>
                <p className="sb-product-text sb-mb-30">{currentProduct.text.split("Ingredients:")[0].trim()}</p>
                <ProductButtons />
              </div>
            </div>
          </div>

          <div className="sb-ingredients-section">
            <div className="sb-tab">
              <ProductAtts />
            </div>
          </div>

        </div>
      </section>
      {/* product end */}
    </>
  );
};

const Products = () => {
  return (
    <>
      <Suspense fallback={<div className="container"><p>Loading...</p></div>}>
        <ProductContent />
      </Suspense>

      <ProductsSlider
        items={ProductsData.items}
        title={'It is usually bought together with this product'}
        description={'Consectetur numquam poro nemo veniam<br>eligendi rem adipisci quo modi.'}
        button={0}
        slidesPerView={4}
        itemType={'product'}
      />
    </>
  );
};

export const dynamic = "force-dynamic";

export default Products;
