/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./cart.css";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BsFillXSquareFill } from "react-icons/bs";

export default function Cart({ cartItems, addCart, removeCart, deleteCart }) {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [checkStatus, setCheckStatus] = useState(false);
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
  // console.log(cartItems);
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

  // console.log(getCartProduct().map((data) => data));

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
                  <li className="cart__heading-item"></li>
                </ul>
              </div>
              {getCartProduct().map((data) => {
                total += data.pr1.Gia * data.pr2.SoLuong;
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
                      <li className="cart__heading-item-quantity">
                        {data.pr2.SoLuong === 1 ? (
                          <button
                            className="btn-cart__quantity"
                            disabled
                            onClick={() => removeCart(data.pr2.MSHH)}
                          >
                            -
                          </button>
                        ) : (
                          <button
                            className="btn-cart__quantity"
                            onClick={() => removeCart(data.pr2.MSHH)}
                          >
                            -
                          </button>
                        )}
                        {data.pr2.SoLuong}
                        {data.pr1.SoLuongHang - data.pr2.SoLuong > 0 ? (
                          <button
                            className="btn-cart__quantity"
                            onClick={() => addCart(data.pr2.MSHH)}
                          >
                            +
                          </button>
                        ) : (
                          <button
                            className="btn-cart__quantity"
                            disabled
                            onClick={() => addCart(data.pr2.MSHH)}
                          >
                            +
                          </button>
                        )}
                      </li>
                      <li className="cart__heading-item">
                        {new Intl.NumberFormat().format(
                          data.pr1.Gia * data.pr2.SoLuong
                        )}{" "}
                        VND
                      </li>
                      <li className="cart__heading-item">
                        <BsFillXSquareFill
                          className="cart__delete-item"
                          onClick={() => removeCart(data.pr2.MSHH)}
                        />
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
                      // checked={checkStatus ? "checked" : ""}
                      defaultChecked={checkStatus}
                      className="cart__shipping-select-item"
                      onChange={() => setCheckStatus(!checkStatus)}
                    />
                    Shipping (+0.5%)
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
                      <p className="">
                        {checkStatus
                          ? new Intl.NumberFormat().format(total)
                          : 0}{" "}
                        VND x 0.5%
                      </p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Total: </p>
                      <p className="cart__total-item-value">
                        {checkStatus
                          ? new Intl.NumberFormat().format(
                              total + total * 0.005
                            )
                          : new Intl.NumberFormat().format(total)}{" "}
                        VND
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              {user ? (
                <div className="row">
                  <button className="btn" onClick={deleteCart}>
                    Delete Cart
                  </button>
                  <button className="btn">
                    <Link to="/thanh-toan" className="link__btn">
                      GO TO CHECKOUT
                    </Link>
                  </button>
                </div>
              ) : (
                <div className="row">
                  <button className="btn" disabled onClick={deleteCart}>
                    Delete Cart
                  </button>
                  <button className="btn" disabled>
                    GO TO CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="cart-empty-wrapper">
            <h2 className="cart-empty"> {"< Cart is Empty ! >"} </h2>
            <button className="btn">
              <Link to="/" className="link__btn">
                Back to Shopping
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
