/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link, useLocation, Redirect } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Cart/cart.css";
import "./orderdetails.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
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

  const orderStatusArray = [
    "Chờ xác nhận",
    "Đang xử lý",
    "Đang giao hàng",
    "Đã nhận hàng",
  ];

  const updateOrderHandle = async (e) => {
    e.preventDefault();
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cập nhật đơn hàng thành công !",
            showConfirmButton: false,
            timer: 1500,
          });
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
        if (res.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cập nhật tình trạng đơn hàng thành công !",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                      <p className="cart__total-item-text">Mã đơn hàng: </p>
                      <p className="">{data.id_order}</p>
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
            </div>
            <form className="order-details__form-section">
              <div className="order-details__form-block">
                <label for="name">
                  Mã đơn đặt hàng
                  <span style={{ color: "#eb0028" }}>
                    (Cập nhật trạng thái)
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Order ID"
                  className="order-details__form-input"
                  onChange={(e) => setIdOrderUpdate(e.target.value)}
                />
              </div>

              <div className="order-details__form-block">
                <label for="adress">Mã số nhân viên</label>
                <input
                  className="order-details__form-input"
                  type="text"
                  id="adress"
                  placeholder="Staff ID"
                  onChange={(e) => setIdStaffOrderUpdate(e.target.value)}
                />
              </div>
              <div className="order-details__form-block">
                <label for="adress">Mã sản phẩm</label>
                <input
                  className="order-details__form-input"
                  type="text"
                  id="adress"
                  placeholder="Product ID"
                  onChange={(e) => setIdProductOrderUpdate(e.target.value)}
                />
              </div>
              <div className="order-details__form-block">
                <label for="adress">Số lượng</label>
                <input
                  className="order-details__form-input"
                  type="text"
                  id="adress"
                  placeholder="Quantity"
                  onChange={(e) => setQuantityOrderUpdate(e.target.value)}
                />
              </div>
              <div className="order-details__form-block">
                <label for="adress">
                  Tình trạng đơn hàng
                  <span style={{ color: "#eb0028" }}>
                    (Cập nhật trạng thái)
                  </span>
                </label>
                <select
                  className="form-input"
                  value={statusOrderUpdate}
                  onChange={(e) => setStatusOrderUpdate(e.target.value)}
                >
                  {orderStatusArray.map((data) => {
                    return (
                      <>
                        <option value={data}>{data}</option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div className="order-details__form-flex__btn">
                <button className="btn" onClick={updateOrderHandle}>
                  CẬP NHẬT
                </button>
              </div>
            </form>
          </div>

          <div className="row">
            <button className="btn">
              <Link to="/admin" className="link__btn">
                TRỞ VỀ QUẢN LÝ
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
