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
    const fetchAPI = async () => {
      const response = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });
      if (response.data.logged) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
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
    fetchAPI();
  }, [idCustomerQuery, idOrderQuery, user.token]);

  //Total price variable
  var total = 0;

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

  if (!authorized) {
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
            total += data.Gia * data.SoLuong;
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
                      <p className="">{data.id_order}</p>
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
                        {new Intl.NumberFormat().format(total)} VND
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
                <select
                  className="order-details__form-input"
                  value={statusOrderUpdate}
                  onChange={(e) => setStatusOrderUpdate(e.target.value)}
                >
                  <option value="Completed">Completed</option>
                  <option value="Not Yet">Not Yet</option>
                </select>
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
