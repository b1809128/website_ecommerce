import React, { useContext, useState, useEffect } from "react";
import { FaAngleRight, FaEdit } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import axios from "axios";
import "./checkout.css";
import "../Profile/Profile.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../components/modal/Modal";
import CustomerEdit from "../Edit/CustomerEdit";

export default function CheckOut({
  cartItems,
  deleteCartAfterCheckOut,
  deleteCheckOut,
}) {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  var total = 0;
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAPI = async () => {
      try {
        const result = await axios.get("http://localhost:5000/product/all");
        setProduct(result.data);
        const result2 = await axios.get(
          `http://localhost:5000/customer/all/${user.result[0].id}`
        );
        setCustomerData(result2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, [user.result]);

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

  const alertOrderSuccess = () => {
    Swal.fire(
      "Đặt hàng thành công !",
      "Nhấn để tiếp tục mua hàng !",
      "success"
    );
  };

  const orderHandle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/customer/order/add/${user.result[0].id}`
      );
      await axios.post(
        `http://localhost:5000/customer/order-details/add`,
        cartItems.map((data) => {
          return { id_order: response.data.id_order, ...data };
        })
      );
      deleteCartAfterCheckOut();
    } catch (error) {
      console.log(error);
    }
    alertOrderSuccess();
  };

  const orderHandleNotInfo = (e) => {
    e.preventDefault();
    Swal.fire(
      "Bạn chưa điền thông tin khách hàng !",
      "Nhấn để tiếp tục !",
      "success"
    );
  };
  // console.log(getCartProduct().map(data=> JSON.parse(data.pr1.MoTa)));
  // console.log(cartItems.map(data=>{return  {id_order:8898,...data}}));

  //TODO: Modal
  const [statusModal, setStatusModal] = useState(false);
  const showModal = () => {
    setStatusModal(true);
  };

  const closeModal = () => {
    setStatusModal(false);
  };

  if (cartItems.length === 0) {
    Swal.fire({
      icon: "success",
      title: "Bạn không có hóa đơn thanh toán nào !",
    });
    return <Redirect to="/gio-hang" />;
  }

  return (
    <div className="check">
      <Modal
        status={statusModal}
        children={<CustomerEdit />}
        closeModal={closeModal}
      />
      <div className="check-section">
        <div className="check__row">
          <LocationBar />
          <div className="row">
            <div className="check__form">
              <div className="checkout__total">
                <div className="profile__header">
                  <h2 className="cart__total-title">THÔNG TIN KHÁCH HÀNG</h2>
                  <FaEdit
                    style={{
                      color: "#28a745",
                    }}
                    onClick={showModal}
                  />
                </div>
                {customerData.length > 0 ? (
                  customerData.map((data) => {
                    return (
                      <ul className="cart__total-list">
                        <li className="cart__total-item">
                          <p className="cart__total-item-text">
                            Mã số khách hàng:{" "}
                          </p>
                          <p className="">{data.id}</p>
                        </li>
                        <li className="cart__total-item">
                          <p className="cart__total-item-text">Họ tên: </p>
                          <p className="">{data.fullname}</p>
                        </li>
                        <li className="cart__total-item">
                          <p className="cart__total-item-text">
                            Số điện thoại:{" "}
                          </p>
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
                  })
                ) : (
                  <h4
                    style={{
                      color: "#eb0028",
                      paddingTop: "25%",
                      textAlign: "center",
                    }}
                  >
                    {"< Bạn chưa điền vào thông tin khách hàng >"}
                  </h4>
                )}
              </div>
            </div>
            {/* Check method */}
            <div className="check__method">
              <h2 className="check__method-title">HÓA ĐƠN THANH TOÁN</h2>
              <form className="form-section">
                <div className="form-block">
                  {getCartProduct().map((data) => {
                    total += data.pr1.Gia * data.pr2.SoLuong;
                    return (
                      <div class="form-flex__product">
                        <img
                          alt="flexproduct"
                          src={JSON.parse(data.pr1.PATH)[0]}
                          className="form-flex__product-img"
                        />
                        <div className="form-flex__product-info">
                          <h4>{data.pr1.TenHH}</h4>
                          <p>{new Intl.NumberFormat().format(data.pr1.Gia)}</p>
                          <p>Số lượng: {data.pr2.SoLuong}</p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="form-flex__price">
                    <h3>Tổng cộng:</h3>
                    <p className="form-flex__price-value">
                      {new Intl.NumberFormat().format(total)} VND
                    </p>
                  </div>
                </div>
                <h2 className="check__method-title">PHƯƠNG THỨC THANH TOÁN</h2>
                <div className="form-flex">
                  <input type="checkbox" className="method" /> Thanh toán khi
                  nhận hàng
                </div>
                <div className="form-flex">
                  <input type="checkbox" className="method" /> Thanh toán qua
                  thẻ tín dụng
                </div>
                <div className="form-flex">
                  <div className="form-flex">
                    <input type="checkbox" className="method" />
                    <img
                      src="./images/logo/vietcombank.jpg"
                      style={{
                        width: "55px",
                        height: "40px",
                        boxShadow: "0 4px 8px rgba(0,0,0,.45)",
                        margin: "0 12px",
                        borderRadius: "6px",
                      }}
                      alt="bank"
                    />

                    <input type="checkbox" className="method" />
                    <img
                      src="./images/logo/viettin.jpg"
                      style={{
                        width: "55px",
                        height: "40px",
                        boxShadow: "0 4px 8px rgba(0,0,0,.45)",
                        margin: "0 12px",
                        borderRadius: "6px",
                      }}
                      alt="bank"
                    />
                  </div>
                  <input type="checkbox" className="method" />
                  <img
                    src="./images/logo/bidv.jpg"
                    style={{
                      width: "55px",
                      height: "40px",
                      boxShadow: "0 4px 8px rgba(0,0,0,.45)",
                      margin: "0 12px",
                      borderRadius: "6px",
                    }}
                    alt="bank"
                  />
                  <input type="checkbox" className="method" />
                  <img
                    src="./images/logo/vib.jpg"
                    style={{
                      width: "55px",
                      height: "40px",
                      boxShadow: "0 4px 8px rgba(0,0,0,.45)",
                      margin: "0 12px",
                      borderRadius: "6px",
                    }}
                    alt="bank"
                  />
                  <input type="checkbox" className="method" />
                  <img
                    src="./images/logo/mbbank.jpg"
                    style={{
                      width: "55px",
                      height: "40px",
                      boxShadow: "0 4px 8px rgba(0,0,0,.45)",
                      margin: "0 12px",
                      borderRadius: "6px",
                    }}
                    alt="bank"
                  />
                  <input type="checkbox" className="method" />
                  <img
                    src="./images/logo/tpbank.jpg"
                    style={{
                      width: "55px",
                      height: "40px",
                      boxShadow: "0 4px 8px rgba(0,0,0,.45)",
                      margin: "0 12px",
                      borderRadius: "6px",
                    }}
                    alt="bank"
                  />
                </div>
                <div className="form-flex">
                  <button className="btn" onClick={deleteCheckOut}>
                    HỦY ĐƠN HÀNG
                  </button>
                  {customerData.length > 0 ? (
                    <button className="btn" onClick={orderHandle}>
                      <Link to="/" className="link__btn">
                        ĐẶT HÀNG <FaAngleRight />
                      </Link>
                    </button>
                  ) : (
                    <button className="btn" onClick={orderHandleNotInfo}>
                      ĐẶT HÀNG <FaAngleRight />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
