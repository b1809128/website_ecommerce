import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import { FaAngleRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../CheckOut/checkout.css";
import "./edit.css";
export default function Edit() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });
      //   console.log(res);
      if (res1.data.logged) {
        setAuthorized(true);
        // setAuthText(res.data.message);
      } else {
        setAuthorized(false);
        // setAuthText(res.data.message);
      }
    };
    fetch();
  }, [user.token]);
  if (!authorized) {
    // alert("You are not authorized !");
    return <Redirect to="/sign-in" />;
  }
  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <LocationBar />
          <div className="row">
            <div className="check__form">
              <h2 className="check__form-title">Product</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Product ID*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Product ID"
                    className="form-input"
                  />
                </div>
                <div className="form-block">
                  <label for="name">Product name*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Product name"
                    className="form-input"
                  />
                </div>

                <div className="form-block">
                  <label for="email">Price*</label>
                  <input
                    type="text"
                    id="price"
                    className="form-input"
                    placeholder="10.000.000 VND"
                  />
                </div>

                <div className="form-block">
                  <label for="adress">Quantity*</label>
                  <input
                    className="form-input"
                    type="text"
                    id="quantity"
                    placeholder="Quantity"
                  />
                </div>

                <div className="form-block">
                  <label for="phone">Tags*</label>
                  <input type="text" id="tag" className="form-input" />
                </div>

                <div className="form-block">
                  <label for="notes">Description</label>
                  <textarea id="notes"></textarea>
                </div>
                <div className="form-flex__btn">
                  <button className="btn">Create</button>
                  <button className="btn">Update</button>
                </div>
              </form>
            </div>
            {/* Delete,Upload method */}
            <div className="check__method">
              <h2 className="check__method-title">Upload</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Product ID*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Product ID"
                    className="form-input"
                  />
                </div>
                <div className="form-block">
                  <label for="notes">Images / URL</label>
                  <input type="file" className="form-input" />
                  <textarea id="notes"></textarea>
                </div>
                <div className="form-flex__btn">
                  <button className="btn">Upload</button>
                </div>
              </form>
              <h2 className="check__form-title">Delete</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Product ID*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Product ID"
                    className="form-input"
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn">Delete</button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            {/* Customer method */}
            <div className="check__form">
              <h2 className="check__form-title">Customer</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Customer ID*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Customer ID"
                    className="form-input"
                  />
                </div>

                <div className="form-block">
                  <label for="email">Username*</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Username"
                  />
                </div>

                <div className="form-block">
                  <label for="adress">Password*</label>
                  <input
                    className="form-input"
                    type="text"
                    id="adress"
                    placeholder="Password"
                  />
                </div>

                <div className="form-block">
                  <label for="role">Role*</label>
                  <input
                    type="text"
                    id="role"
                    placeholder="Role"
                    className="form-input"
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn">Update</button>
                </div>
              </form>
            </div>
            {/* Order method */}
            <div className="check__method">
              <h2 className="check__method-title">Order</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Order ID*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Order ID"
                    className="form-input"
                  />
                </div>

                <div className="form-block">
                  <label for="email">Customer ID*</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Customer ID"
                  />
                </div>

                <div className="form-block">
                  <label for="adress">Staff ID*</label>
                  <input
                    className="form-input"
                    type="text"
                    id="adress"
                    placeholder="Staff ID"
                  />
                </div>
                <div className="form-block">
                  <label for="adress">Product ID*</label>
                  <input
                    className="form-input"
                    type="text"
                    id="adress"
                    placeholder="Product ID"
                  />
                </div>
                <div className="form-block">
                  <label for="adress">Quantity*</label>
                  <input
                    className="form-input"
                    type="text"
                    id="adress"
                    placeholder="Quantity"
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
