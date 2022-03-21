import React, { useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import axios from "axios";
import "./checkout.css";
import Swal from "sweetalert2";

export default function CheckOut({ cartItems }) {
  const [product, setProduct] = useState([]);
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

  const orderHandle = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Order Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // console.log(getCartProduct().map(data=> JSON.parse(data.pr1.MoTa)));

  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <LocationBar />
          <div className="row">
            <div className="check__form">
              <h2 className="check__form-title">Order</h2>
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
