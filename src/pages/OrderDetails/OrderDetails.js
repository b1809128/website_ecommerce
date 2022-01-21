/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useLocation } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Cart/cart.css";
import "./orderdetails.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function OrderDetails() {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id");
  const [propsData, setPropsData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  // const [customerData,setCustomerData] = useState([]);
  //TODO: get id customer
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const result = await axios.get(
        `http://localhost:5000/manage/order/details/${id}`
      );
      const result2 = await axios.get(
        `http://localhost:5000/manage/order/${id}`
      );
      setPropsData(result.data);
      setOrderData(result2.data);
    };
    fetch();
  }, [id]);
  var s = 0;

  //TODO: update order function
  const [idOrderUpdate, setIdOrderUpdate] = useState("");
  const [idStaffOrderUpdate, setIdStaffOrderUpdate] = useState("");
  const [idProductOrderUpdate, setIdProductOrderUpdate] = useState("");
  const [quantityOrderUpdate, setQuantityOrderUpdate] = useState("");
  const [statusOrderUpdate, setStatusOrderUpdate] = useState("");

  const updateOrderHandle = async () => {
    const arrayOrder = [
      idOrderUpdate,
      idStaffOrderUpdate,
      idProductOrderUpdate,
      quantityOrderUpdate,
      statusOrderUpdate,
    ];
    var newArrayOrder = [];
    for (let i = 0; i < arrayOrder.length; i++) {
      if (arrayOrder[i] !== "") {
        newArrayOrder.push(arrayOrder[i]);
      }
    }
    if (newArrayOrder.length === 5) {
      try {
        const res = await axios.patch(
          `http://localhost:5000/manage/order/updateonly/${idOrderUpdate}`,
          { id_staff: idStaffOrderUpdate, status: statusOrderUpdate }
        );
        await axios.patch(
          `http://localhost:5000/manage/order/details/updateonly/${idOrderUpdate}`,
          { MSHH: idProductOrderUpdate, SoLuong: quantityOrderUpdate }
        );
        if (res.data) {
          alert(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.patch(
          `http://localhost:5000/manage/order/updateonly/${idOrderUpdate}`,
          { status: statusOrderUpdate }
        );
        alert(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                      <p className="cart__total-item-value">{data.id_order}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">ID Order: </p>
                      <p className="cart__total-item-value">{data.id}</p>
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
                      <p className="">{data.status}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Total: </p>
                      <p className="cart__total-item-value">
                        {new Intl.NumberFormat().format(s)} VND
                      </p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Phone Number: </p>
                      <p className="cart__total-item-value">
                        {data.phonenumber}
                      </p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Email: </p>
                      <p className="cart__total-item-value">{data.email}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Address: </p>
                      <p className="cart__total-item-value">
                        {data.adressdetails}
                      </p>
                    </li>
                  </ul>
                );
              })}
            </div>
            <form className="order-details__form-section">
              <div className="order-details__form-block">
                <label for="name">Order ID*</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Order ID"
                  className="order-details__form-input"
                  onChange={(e) => setIdOrderUpdate(e.target.value)}
                />
              </div>

              <div className="order-details__form-block">
                <label for="adress">Staff ID</label>
                <input
                  className="order-details__form-input"
                  type="text"
                  id="adress"
                  placeholder="Staff ID"
                  onChange={(e) => setIdStaffOrderUpdate(e.target.value)}
                />
              </div>
              <div className="order-details__form-block">
                <label for="adress">Product ID</label>
                <input
                  className="order-details__form-input"
                  type="text"
                  id="adress"
                  placeholder="Product ID"
                  onChange={(e) => setIdProductOrderUpdate(e.target.value)}
                />
              </div>
              <div className="order-details__form-block">
                <label for="adress">Quantity</label>
                <input
                  className="order-details__form-input"
                  type="text"
                  id="adress"
                  placeholder="Quantity"
                  onChange={(e) => setQuantityOrderUpdate(e.target.value)}
                />
              </div>
              <div className="order-details__form-block">
                <label for="adress">Status</label>
                <input
                  className="order-details__form-input"
                  type="text"
                  id="adress"
                  placeholder="Yet/Not yet"
                  onChange={(e) => setStatusOrderUpdate(e.target.value)}
                />
              </div>
              <div className="order-details__form-flex__btn">
                <button className="btn" onClick={updateOrderHandle}>
                  Update
                </button>
              </div>
            </form>
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
