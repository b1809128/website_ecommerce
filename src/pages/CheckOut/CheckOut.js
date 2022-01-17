import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./checkout.css";
export default function CheckOut() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                    type="radio"
                    class="input-radio"
                    name="gender"
                    value="nam"
                    checked="checked"
                    style={{ width: "10%" }}
                  />
                  <span style={{ marginRight: "10%" }}>Male</span>
                  <input
                    id="gender"
                    type="radio"
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
                  <div class="form-flex__product">
                    <img
                      alt="flexproduct"
                      src="images/products/product_1.jpg"
                      className="form-flex__product-img"
                    />
                    <div className="form-flex__product-info">
                      <h4>Apple Iphone 12 Promax</h4>
                      <p>Gray/256GB</p>
                      <p>Quantity: 1</p>
                    </div>
                  </div>
                  <div className="form-flex__price">
                    <h3>Subtotal:</h3>
                    <p className="form-flex__price-value">27.990.000 VND</p>
                  </div>
                </div>
                <h2 className="check__method-title">Payment Methods</h2>
                <div className="form-flex">
                  <input type="radio" className="method" /> Payment On Delivery
                </div>
                <div className="form-flex">
                  <input type="radio" className="method" /> Payment Via Card
                </div>
                <button className="btn">
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
