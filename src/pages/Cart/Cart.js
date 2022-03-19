/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./cart.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Cart({ cartItems }) {
  // console.log(cartItems.map(data => data.MSHH));

  const [product, setProduct] = useState([]);
  var total = 0;
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAPI = async () => {
      try {
        const result = await axios.get("http://localhost:5000/product/all");
        setProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  const getCartProduct = () => {
    let array = [];
    for (let i = 0; i < cartItems.length; i++) {
      for (let j = 0; j < product.length; j++) {
        if (cartItems[i].MSHH === product[j].MSHH) {
          array.push({ pr1: product[j], pr2: cartItems[i] });
        }
      }
    }

    return array;
  };

  // console.log(getCartProduct());

  return (
    <>
      {cartItems.length > 0 ? (
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
              {getCartProduct().map((data) => {
                total += data.pr1.Gia * data.pr2.SoLuongHang;
                return (
                  <div className="row">
                    <ul className="cart__heading">
                      <li className="cart__heading-item">
                        <img
                          src={JSON.parse(data.pr1.PATH)[0]}
                          alt="Product Image"
                          className="cart__img"
                        />
                      </li>
                      <li className="cart__heading-item">
                        <h4>{data.pr1.TenHH}</h4>
                        <p style={{ textAlign: "center" }}>Gray/256GB</p>
                      </li>
                      <li className="cart__heading-item">
                        {new Intl.NumberFormat().format(data.pr1.Gia)}VND
                      </li>
                      <li className="cart__heading-item">
                        {data.pr2.SoLuongHang}
                      </li>
                      <li className="cart__heading-item">
                        {new Intl.NumberFormat().format(
                          data.pr1.Gia * data.pr2.SoLuongHang
                        )}{" "}
                        VND
                      </li>
                    </ul>
                  </div>
                );
              })}

              <div className="row">
                <div className="cart__shipping">
                  <button className="btn">
                    <Link to="/" className="link__btn">
                      CONTINUE SHOPPING
                    </Link>
                  </button>
                  <div className="cart__shipping-select">
                    <input
                      type="checkbox"
                      className="cart__shipping-select-item"
                    />
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
                      <p className="cart__total-item-value">
                        {new Intl.NumberFormat().format(total)} VND
                      </p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Shipping: </p>
                      <p className="">27.990.000 VND x 5%</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Total: </p>
                      <p className="cart__total-item-value">
                        {new Intl.NumberFormat().format(total)} VND
                      </p>
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
      ) : (
        <div className="cart-empty-wrapper">
          <h2 className="cart-empty"> {"< Cart is Empty ! >"} </h2>
          <button className="btn">
            <Link to="/" className="link__btn">
              Back to Shopping
            </Link>
          </button>
        </div>
      )}
    </>
  );
}
