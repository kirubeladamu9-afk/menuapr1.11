"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import AppData from "@data/app.json";
import ProductsData from "@data/products.json";

import ProductImage from "@components/products/ProductImage";
import ProductButtons from "@components/products/ProductButtons";

const ProductsSlider = dynamic( () => import("@components/sliders/Products"), { ssr: false } );
const ProductTabs = dynamic( () => import("@components/products/ProductTabs"), { ssr: false } );

const Products = () => {

  const AttsData = [
    {
      "label": "Numquam",
      "value": "1 pack"
    },
    {
      "label": "Cupiditate",
      "value": "150g"
    },
    {
      "label": "Adipisicing",
      "value": "500g"
    },
    {
      "label": "Dolorem obcaecati",
      "value": "3 Teaspoon"
    },
    {
      "label": "Porro",
      "value": "2 pack"
    },
    {
      "label": "Facilis",
      "value": "1kg"
    },
    {
      "label": "Goluptatem",
      "value": "1 Teaspoon"
    },
    {
      "label": "Vel fuga",
      "value": "300g"
    }
  ];

  async function ProductAtts() {
    return (
      <>
        <ul className="sb-list">
          {AttsData.map((item, key) => (
          <li key={`product-reviews-item-${key}`}><b>{item.label}</b><span>{item.value}</span></li>
          ))}
        </ul>
      </>
    );
  };


  const tabs = [
    {
      "slug": "ingredients",
      "name": "Ingredients"
    }
  ];

  return (
    <>
      {/* product */}
      <section className="sb-p-90-0 sb-product-page">
        <div className="container">
          <Link href="/qr-menu" className="sb-back-btn sb-mb-30">
            <i className="fas fa-arrow-left"></i> Back to Menu
          </Link>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <ProductImage src={"/img/menu/4.jpg"} alt={"Saumon Gravlax"} badge={"<div class='sb-badge sb-vegan'><i class='fas fa-leaf'></i> Vegan</div>"} />
            </div>
            <div className="col-lg-6">
              <div className="sb-product-description sb-mb-90">
                <div className="sb-price-frame sb-mb-30">
                  <div className="sb-price"><sub>$</sub> 19</div>
                </div>
                <ul className="sb-stars sb-mb-25">
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><i className="fas fa-star"></i></li>
                  <li><span>(4 ratings)</span></li>
                </ul>
                <ProductButtons />
              </div>
            </div>
          </div>

          <ProductTabs 
            items={tabs}
            active={"ingredients"}
          />

          <div className="sb-masonry-grid sb-tabs">
            <div className="sb-grid-sizer" />
            
            {tabs.map((tab, key) => (
            <div className={`sb-grid-item sb-${tab.slug}-tab`} key={`product-tab-${key}`}>
              <div className="sb-tab">
                {tab.slug == 'ingredients' && <ProductAtts />}
              </div>
            </div>
            ))}
          </div>

        </div>
      </section>
      {/* product end */}

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
export default Products;
