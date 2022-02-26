/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./cart.css";
import React, { useEffect } from "react";
export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="cart">
      <div className="cart-section">
        <div className="cart__row">
          <LocationBar />
          <div className="row">
            <ul className="cart__heading">
              <li className="cart__heading-item">PRODUCT</li>
              <li className="cart__heading-item">NAME</li>
              <li className="cart__heading-item">PRICE</li>
              <li className="cart__heading-item">QUANTITY</li>
              <li className="cart__heading-item">TOTAL</li>
            </ul>
          </div>
          <div className="row">
            <ul className="cart__heading">
              <li className="cart__heading-item">
                <img
                  src="images/products/product_1.jpg"
                  alt="Product Image"
                  className="cart__img"
                />
              </li>
              <li className="cart__heading-item">
                <h4>Apple Iphone 12 Promax</h4>
                <p style={{ textAlign: "center" }}>Gray/256GB</p>
              </li>
              <li className="cart__heading-item">27.990.000 VND</li>
              <li className="cart__heading-item">1</li>
              <li className="cart__heading-item">27.990.000 VND</li>
            </ul>
          </div>
          <div className="row">
            <ul className="cart__heading">
              <li className="cart__heading-item">
                <img
                  src="images/products/product_2.jpg"
                  alt="Product Image"
                  className="cart__img"
                />
              </li>
              <li className="cart__heading-item">
                <h4>Apple Iphone 12 Promax</h4>
                <p style={{ textAlign: "center" }}>Gray/256GB</p>
              </li>
              <li className="cart__heading-item">27.990.000 VND</li>
              <li className="cart__heading-item">1</li>
              <li className="cart__heading-item">27.990.000 VND</li>
            </ul>
          </div>
          <div className="row">
            <ul className="cart__heading">
              <li className="cart__heading-item">
                <img
                  src="images/products/product_3.jpg"
                  alt="Product Image"
                  className="cart__img"
                />
              </li>
              <li className="cart__heading-item">
                <h4>Apple Iphone 12 Promax</h4>
                <p style={{ textAlign: "center" }}>Gray/256GB</p>
              </li>
              <li className="cart__heading-item">27.990.000 VND</li>
              <li className="cart__heading-item">1</li>
              <li className="cart__heading-item">27.990.000 VND</li>
            </ul>
          </div>
          <div className="row">
            <ul className="cart__heading">
              <li className="cart__heading-item">
                <img
                  src="images/products/product_4.jpg"
                  alt="Product Image"
                  className="cart__img"
                />
              </li>
              <li className="cart__heading-item">
                <h4>Apple Iphone 12 Promax</h4>
                <p style={{ textAlign: "center" }}>Gray/256GB</p>
              </li>
              <li className="cart__heading-item">27.990.000 VND</li>
              <li className="cart__heading-item">1</li>
              <li className="cart__heading-item">27.990.000 VND</li>
            </ul>
          </div>
          <div className="row">
            <div className="cart__shipping">
              <button className="btn">
                <Link to="/" className="link__btn">
                  CONTINUE SHOPPING
                </Link>
              </button>
              <div className="cart__shipping-select">
                <input type="checkbox" className="cart__shipping-select-item" />
                Shipping (+5%)
              </div>
            </div>
          </div>

          <div className="row">
            <div className="cart__total">
              <h2 className="cart__total-title">CART TOTAL</h2>
              <ul className="cart__total-list">
                <li className="cart__total-item">
                  <p className="cart__total-item-text">Subtotal: </p>
                  <p className="cart__total-item-value">27.990.000 VND</p>
                </li>
                <li className="cart__total-item">
                  <p className="cart__total-item-text">Shipping: </p>
                  <p className="">27.990.000 VND x 5%</p>
                </li>
                <li className="cart__total-item">
                  <p className="cart__total-item-text">Total: </p>
                  <p className="cart__total-item-value">29.289.500 VND</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <button className="btn">
              <Link to="/check-out" className="link__btn">
                GO TO CHECKOUT
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
