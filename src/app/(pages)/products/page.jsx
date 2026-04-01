"use client";

import React from "react";

import AppData from "@data/app.json";
import ProductsData from "@data/products.json";

import PageBanner from "@components/PageBanner";
import ProductsGrid from "@components/products/ProductsGrid";
import PromoSection from "@components/sections/Promo";
import { useLanguage } from "@common/LanguageContext";

const Products = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner pageTitle={t('pages.products')} breadTitle={t('pages.products')} type={1} />

      {/* shop list */}
      <section className="sb-menu-section sb-p-90-60">
        <div className="sb-bg-1">
          <div />
        </div>
        <div className="container">
          <ProductsGrid items={ProductsData.items} />

          <div>
            <ul className="sb-pagination">
              <li className="sb-active"><a href="#.">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">...</a></li>
            </ul>
          </div>
        </div>
      </section>
      {/* shop list end */}

      <PromoSection />
    </>
  );
};
export default Products;
