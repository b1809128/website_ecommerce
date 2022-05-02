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
        title: "Bạn có chắc muốn xóa ?",
        text: "Bạn không thể hoàn tác hành động này !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tiếp tục xóa",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Đã xóa !",
            "Đơn hàng của bạn đã được xóa thành công !",
            "success"
          );
          delOrder();
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
// console.log(orderStatus);
  if (!authorized) {
    return <Redirect to="/dang-nhap" />;
  }

  return (
    <div className="cart">
      <div className="cart-section">
        <div className="cart__row">
          <LocationBar />
          <div className="row">
            <ul className="cart__heading">
              <li className="cart__heading-item">HÌNH ẢNH</li>
              <li className="cart__heading-item">TÊN SẢN PHẨM</li>
              <li className="cart__heading-item">GIÁ</li>
              <li className="cart__heading-item">SỐ LƯỢNG</li>
              <li className="cart__heading-item">TỔNG CỘNG</li>
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
              <h2 className="cart__total-title">CHI TIẾT ĐƠN HÀNG</h2>
              {orderData.map((data) => {
                return (
                  <ul className="cart__total-list">
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Mã đơn đặt hàng: </p>
                      <p className="">#{data.id_order}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">
                        Mã số khách hàng:{" "}
                      </p>
                      <p className="">{data.id}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Mã số nhân viên: </p>
                      <p className="">{data.id_staff}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Ngày đặt hàng: </p>
                      <p className="">
                        {new Date(data.created_at).toDateString()}
                      </p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">
                        Tình trạng đơn hàng:{" "}
                      </p>
                      <p className="cart__total-item-value">{data.status}</p>
                    </li>
                    <li className="cart__total-item">
                      <p className="cart__total-item-text">Tổng cộng: </p>
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
              {orderStatus[0] === "Chờ xác nhận" ? (
                <button className="btn" onClick={deleteHandle}>
                  XÓA ĐƠN HÀNG
                </button>
              ) : (
                ""
              )}
            </div>
            <div
              className="order-details__form-section"
              style={{
                backgroundImage: `url("./images/logo/ship2.png")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <h2 className="cart__total-title">TÌNH TRẠNG VẬN CHUYỂN</h2>
              <OrderStatus status={orderStatus} />
            </div>
          </div>

          <div className="row">
            <button className="btn">
              <Link to="/thong-tin-khach-hang" className="link__btn">
                TRỞ VỀ
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
