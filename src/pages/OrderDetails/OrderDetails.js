/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useLocation } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Cart/cart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function OrderDetails() {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const [propsData, setPropsData] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const result = await axios.get(
        `http://localhost:5000/manage/order/details/${id}`
      );
      setPropsData(result.data);
      //   console.log(result.data);
    };
    fetch();
  }, [id]);
  console.log(propsData);
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
          {propsData.map((data) => {
            return (
              <div className="row">
                <ul className="cart__heading">
                  <li className="cart__heading-item">
                    <img
                      src={JSON.parse(data.PATH)[0]}
                      alt="Product Image"
                      className="cart__img"
                    />
                  </li>
                  <li className="cart__heading-item">
                    <h4>{data.TenHH}</h4>
                    <p style={{ textAlign: "center" }}>Gray/256GB</p>
                  </li>
                  <li className="cart__heading-item">
                    {new Intl.NumberFormat().format(data.Gia)}VND
                  </li>
                  <li className="cart__heading-item">{data.SoLuong}</li>
                  <li className="cart__heading-item">
                    {new Intl.NumberFormat().format(data.Gia * data.SoLuong)}{" "}
                    VND
                  </li>
                </ul>
              </div>
            );
          })}

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
              <Link to="/admin" className="link__btn">
                Back to Admin
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
