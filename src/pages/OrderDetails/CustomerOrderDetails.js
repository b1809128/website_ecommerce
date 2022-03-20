/* eslint-disable jsx-a11y/img-redundant-alt */
import "../Cart/cart.css";
import "./orderdetails.css";
import { Link, useLocation, Redirect, useHistory } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import OrderStatus from "../../components/orderstatus/OrderStatus";
import Swal from "sweetalert2";

export default function AdminOrderDetails() {
  const query = new URLSearchParams(useLocation().search);
  const idOrderQuery = query.get("id_order");
  const idCustomerQuery = query.get("id");
  const [propsData, setPropsData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const history = useHistory();
  //TODO: get id customer
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAPI = async () => {
      const response = await axios.post("http://localhost:5000/auth/profile", {
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

  //Total Price variable
  var total = 0;

  //TODO: Delete order

  const deleteHandle = (e) => {
    e.preventDefault();
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your Profile has been deleted.", "success");
          delOrder()
        }
      });
    }
  };

  const delOrder = async () => {
    try {
      history.push("/profile");
      await axios.delete(
        `http://localhost:5000/manage/order/delete/${idOrderQuery}`
      );
    } catch (error) {
      console.log(error);
    }
  };



  //TODO:Order status
  const orderStatus = orderData.map((data) => data.status);

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
              <button className="btn" onClick={deleteHandle}>
                Delete Order
              </button>
            </div>
            <div
              className="order-details__form-section"
              style={{
                backgroundImage: `url("./images/logo/ship2.png")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <h2 className="cart__total-title">ORDER STATUS</h2>
              <OrderStatus status={orderStatus} />
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
