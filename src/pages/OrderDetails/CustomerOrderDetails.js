/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useLocation, Redirect } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Cart/cart.css";
import "./orderdetails.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function AdminOrderDetails() {
  const query = new URLSearchParams(useLocation().search);
  const idOrderQuery = query.get("id_order");
  const idCustomerQuery = query.get("id");
  const [propsData, setPropsData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  //TODO: get id customer
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await axios.post("http://localhost:5000/auth/profile", {
        token: user.token,
      });
      //   console.log(res);
      if (response.data.logged) {
        setAuthorized(true);
        // setAuthText(res.data.message);
      } else {
        setAuthorized(false);
        // setAuthText(res.data.message);
      }
      const result = await axios.get(
        `http://localhost:5000/manage/order/details/${idOrderQuery}`
      );
      const result2 = await axios.get(
        `http://localhost:5000/manage/order/${idOrderQuery}`
      );
      const result3 = await axios.get(
        `http://localhost:5000/customer/all/${idCustomerQuery}`
      );
      setPropsData(result.data);
      setOrderData(result2.data);
      setCustomerData(result3.data);
    };
    fetch();
  }, [idCustomerQuery, idOrderQuery, user.token]);
  var s = 0;

  if (!authorized) {
    // alert("You are not authorized !");
    return <Redirect to="/sign-in" />;
  }

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
            s += data.Gia * data.SoLuong;
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

          <div className="order-details__row">
            <div className="cart__total">
              <h2 className="cart__total-title">ORDER DETAILS</h2>
              {orderData.map((data) => {
                return (
                  <ul className="cart__total-list">
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">ID Order: </p>
                      <p className="">#{data.id_order}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">ID Customer: </p>
                      <p className="">{data.id}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Sales Man: </p>
                      <p className="">{data.id_staff}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Create At: </p>
                      <p className="">
                        {new Date(data.created_at).toDateString()}
                      </p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Status: </p>
                      <p className="cart__total-item-value">{data.status}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Total: </p>
                      <p className="">
                        {new Intl.NumberFormat().format(s)} VND
                      </p>
                    </li>
                  </ul>
                );
              })}
              {customerData.map((data) => {
                return (
                  <ul className="cart__total-list">
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Phone Number: </p>
                      <p className="">{data.phonenumber}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Email: </p>
                      <p className="">{data.email}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Address: </p>
                      <p className="">{data.addressdetails}</p>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>

          <div className="row">
            <button className="btn">
              <Link to="/profile" className="link__btn">
                Back to Profile
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}