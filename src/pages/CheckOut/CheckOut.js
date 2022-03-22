import React, { useContext, useState, useEffect } from "react";
import { FaAngleRight, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import axios from "axios";
import "./checkout.css";
import "../Profile/Profile.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

export default function CheckOut({ cartItems, deleteCartCheckOut }) {
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
      "Order Successfully!",
      "Click the button to continue!",
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
      deleteCartCheckOut();
    } catch (error) {
      console.log(error);
    }
    alertOrderSuccess();
  };
  console.log(customerData);
  // console.log(getCartProduct().map(data=> JSON.parse(data.pr1.MoTa)));
  // console.log(cartItems.map(data=>{return  {id_order:8898,...data}}));

  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <LocationBar />
          <div className="row">
            <div className="check__form">
              {customerData.length > 0 ? (
                <div className="checkout__total">
                  <div className="profile__header">
                    <h2 className="cart__total-title">Customer Information</h2>
                    <FaEdit
                      style={{
                        color: "#28a745",
                      }}
                      // onClick={showModal}
                    />
                  </div>
                  {customerData.map((data) => {
                    return (
                      <ul className="cart__total-list">
                        <li className="cart__total-item">
                          <p className="cart__total-item-text">ID Customer: </p>
                          <p className="">{data.id}</p>
                        </li>
                        <li className="cart__total-item">
                          <p className="cart__total-item-text">Full Name: </p>
                          <p className="">{data.fullname}</p>
                        </li>
                        <li className="cart__total-item">
                          <p className="cart__total-item-text">
                            Phone Number:{" "}
                          </p>
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
              ) : (
                <div className="order__information">
                  <h2 className="check__form-title">Order Information</h2>
                  <form className="form-section">
                    <div className="form-block">
                      <label for="name">Full name*</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Full name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-flex">
                      <label>Gender </label>
                      <input
                        id="gender"
                        type="checkbox"
                        class="input-radio"
                        name="gender"
                        value="nam"
                        checked="checked"
                        style={{ width: "10%" }}
                      />
                      <span style={{ marginRight: "10%" }}>Male</span>
                      <input
                        id="gender"
                        type="checkbox"
                        className="input-radio"
                        name="gender"
                        value="nữ"
                        style={{ width: "10%" }}
                      />
                      <span>Female</span>
                    </div>

                    <div className="form-block">
                      <label for="email">Email*</label>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="expample@gmail.com"
                      />
                    </div>

                    <div className="form-block">
                      <label for="adress">Address*</label>
                      <input
                        className="form-input"
                        type="text"
                        id="adress"
                        placeholder="Street Address"
                      />
                    </div>

                    <div className="form-block">
                      <label for="phone">Phone number*</label>
                      <input type="text" id="phone" className="form-input" />
                    </div>

                    <div className="form-block">
                      <label for="notes">Note</label>
                      <textarea id="notes"></textarea>
                    </div>
                  </form>
                </div>
              )}
            </div>
            {/* Check method */}
            <div className="check__method">
              <h2 className="check__method-title">Your Invoice</h2>
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
                          <p>Gray/256GB</p>
                          <p>Quantity: {data.pr2.SoLuong}</p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="form-flex__price">
                    <h3>Subtotal:</h3>
                    <p className="form-flex__price-value">
                      {new Intl.NumberFormat().format(total)} VND
                    </p>
                  </div>
                </div>
                <h2 className="check__method-title">Payment Methods</h2>
                <div className="form-flex">
                  <input type="checkbox" className="method" /> Payment On
                  Delivery
                </div>
                <div className="form-flex">
                  <input type="checkbox" className="method" /> Payment Via Card
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
                <button className="btn" onClick={orderHandle}>
                  <Link to="/" className="link__btn">
                    ORDER <FaAngleRight />
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
