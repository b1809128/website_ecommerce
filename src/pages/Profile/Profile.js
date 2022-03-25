/* eslint-disable jsx-a11y/img-redundant-alt */
import "../Cart/cart.css";
import "../OrderDetails/orderdetails.css";
import "./Profile.css";
import "../../components/modal/modal.css";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import CustomerEdit from "../Edit/CustomerEdit";
import Modal from "../../components/modal/Modal";
export default function Profile() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);

  const [customerData, setCustomerData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  //TODO: get id customer
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/profile", {
        token: user.token,
      });
      const res2 = await axios.get(
        `http://localhost:5000/customer/all/${user.result[0].id}`
      );
      setCustomerData(res2.data);
      const res3 = await axios.get(
        `http://localhost:5000/customer/order/${user.result[0].id}`
      );
      setOrderData(res3.data);
      if (res1.data.logged) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };
    fetch();
  }, [user.result, user.token]);

  //TODO: Modal
  const [statusModal, setStatusModal] = useState(false);
  const showModal = () => {
    setStatusModal(true);
  };

  const closeModal = () => {
    setStatusModal(false);
  };

  if (!authorized) {
    return <Redirect to="/dang-nhap" />;
  }

  return (
    <>
      <div className="cart">
        <Modal
          status={statusModal}
          children={<CustomerEdit />}
          closeModal={closeModal}
        />
        <div className="cart-section">
          <div className="cart__row">
            <LocationBar />
            <div className="order-details__row">
              <div className="profile__total">
                <div className="profile__header">
                  <h2 className="cart__total-title">Thông tin khách hàng</h2>
                  <FaEdit
                    style={{
                      color: "#28a745",
                    }}
                    onClick={showModal}
                  />
                </div>
                {customerData.map((data) => {
                  return (
                    <ul className="cart__total-list">
                      <li className="cart__total-item">
                        <p className="cart__total-item-text">Mã số khách hàng: </p>
                        <p className="">{data.id}</p>
                      </li>
                      <li className="cart__total-item">
                        <p className="cart__total-item-text">Họ tên: </p>
                        <p className="">{data.fullname}</p>
                      </li>
                      <li className="cart__total-item">
                        <p className="cart__total-item-text">Số điện thoại: </p>
                        <p className="">{data.phonenumber}</p>
                      </li>
                      <li className="cart__total-item">
                        <p className="cart__total-item-text">Email: </p>
                        <p className="">{data.email}</p>
                      </li>
                      <li className="cart__total-item">
                        <p className="cart__total-item-text">Địa chỉ: </p>
                        <p className="">{data.addressdetails}</p>
                      </li>
                    </ul>
                  );
                })}
              </div>

              <div className="profile__form-section">
                <h2 className="profile__total-title">Quản lý đơn đặt hàng</h2>
                <div className="profile__section">
                  {orderData.map((data) => {
                    return (
                      <Link
                        to={{
                          pathname: "/chi-tiet-don-hang",
                          search: `?id_order=${data.id_order}&id=${data.id}`,
                        }}
                        className="profile__link"
                      >
                        <div className="profile__order">
                          <ul className="cart__total-list">
                            <li className="cart__total-item">
                              <p className="cart__total-item-text">
                                Mã đơn đặt hàng:{" "}
                              </p>
                              <p className="">#{data.id_order}</p>
                            </li>
                            <li className="cart__total-item">
                              <p className="cart__total-item-text">
                                Mã số nhân viên:{" "}
                              </p>
                              <p className="">{data.id_staff}</p>
                            </li>
                            <li className="cart__total-item">
                              <p className="cart__total-item-text">
                                Ngày đặt hàng:{" "}
                              </p>
                              <p className="">
                                {new Date(data.created_at).toDateString()}
                              </p>
                            </li>

                            <li className="cart__total-item">
                              <p className="cart__total-item-text">Tình trạng đơn hàng: </p>
                              <p className="cart__total-item-value">
                                {data.status}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
