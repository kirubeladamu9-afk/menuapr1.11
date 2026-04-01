"use client";

import React from "react";

import AppData from "@data/app.json";
import CartData from "@data/cart.json";

import PageBanner from "@components/PageBanner";
import CartItem from "@components/products/CartItem"

import Link from "next/link";
import { useLanguage } from "@common/LanguageContext";

const Cart = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageBanner pageTitle={"Your order."} breadTitle={t('breadcrumb.shop')} type={1} />

      {/* cart */}
      <section className="sb-p-90-90">
        <div className="container">
          <div className="sb-cart-table">
            <div className="sb-cart-table-header">
              <div className="row">
                <div className="col-lg-6">{t('shopping.product')}</div>
                <div className="col-lg-3">{t('shopping.quantity')}</div>
                <div className="col-lg-1">{t('shopping.price')}</div>
                <div className="col-lg-1">{t('shopping.total')}</div>
                <div className="col-lg-1"></div>
              </div>
            </div>

            {CartData.items.map((item, key) => (
            <CartItem item={item} key={key} />
            ))}

            <div className="row justify-content-end">
              <div className="col-lg-6">
                <div className="sb-cart-total">
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">{t('shopping.subtotal')}</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-1 text-right">$32.99</div>
                      </div>
                    </div>
                  </div>
                  <div className="sb-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">{t('shopping.estimatedShipping')}</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-1 text-right">$5</div>
                      </div>
                    </div>
                  </div>
                  <div className="sb-realy-sum">
                    <div className="row">
                      <div className="col-8">
                        <div className="sb-total-title">{t('shopping.total')}</div>
                      </div>
                      <div className="col-4">
                        <div className="sb-price-2 text-right">$37.99</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sb-cart-btns-frame text-right">
                  {/* button */}
                  <Link href="/shop" className="sb-btn sb-btn-2 sb-btn-gray">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                    </span>
                    <span>{t('shopping.continueShopping')}</span>
                  </Link>
                  {/* button end */}
                  {/* button */}
                  <Link href="/checkout" className="sb-btn sb-m-0">
                    <span className="sb-icon">
                      <img src="/img/ui/icons/arrow.svg" alt="icon" />
                    </span>
                    <span>{t('shopping.checkout')}</span>
                  </Link>
                  {/* button end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* cart end */}
    </>
  );
};
export default Cart;
