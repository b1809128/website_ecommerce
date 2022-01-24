import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Redirect, Link, useHistory } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../CheckOut/checkout.css";
import "./edit.css";
import { BiArrowBack } from "react-icons/bi";
import crypto from "crypto";
export default function CustomerEdit() {
  const { user, dispatch } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const history = useHistory();
  //TODO: Auto fetchAPI
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/profile", {
        token: user.token,
      });
      if (res1.data.logged) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };
    fetch();
  }, [user.token]);

  //TODO: Create Product function
  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  //FIXME: Must be parse to JSON after push to server
  const createHandle = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/customer/address/add",
        {
          id: user.result[0].id,
          fullname: fullname,
          phonenumber: phoneNumber,
          email: email,
          addressdetails: address,
        }
      );
      if (res.data) {
        alert(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Update Password function
  const [password, setPassword] = useState("");
  const changePassword = async () => {
    var hashPash = crypto.createHash("md5").update(password).digest("hex");
    try {
      const res = await axios.patch(
        `http://localhost:5000/manage/customer/updateonly/${user.result[0].id}`,
        {
          password: hashPash,
        }
      );

      if (res.data) {
        alert(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Delete Product function

  const deleteHandle = async () => {
    try {
      alert(
        "The development team will accept comments. Thank you and See you again !"
      );
      history.push("/sign-in");
      dispatch({ type: "LOGOUT" });
      await axios.delete(
        `http://localhost:5000/customer/delete/${user.result[0].id}`
      );
      await axios.get("http://localhost:5000/auth/logout");
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

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
            <Link
              to="/profile"
              className="link"
              style={{
                color: "#eb0028",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              <BiArrowBack />
              Back to Profile
            </Link>
          </div>
          <div className="row">
            <div className="check__form">
              {/*TODO: Address method */}
              <h2 className="check__form-title">Address Shipping</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    className="form-input"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-block">
                  <label for="name">Phone Number*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Phone Number"
                    className="form-input"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="form-block">
                  <label for="email">Email*</label>
                  <input
                    type="email"
                    id="price"
                    className="form-input"
                    placeholder="rabbit@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-block">
                  <label for="adress">Address Details*</label>
                  <textarea
                    type="text"
                    id="quantity"
                    placeholder="29/13, 30/4 Street, Ninh Kieu District, Can Tho City"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={createHandle}>
                    Create
                  </button>
                  <button className="btn">Update</button>
                </div>
              </form>
            </div>
            <div className="check__method">
              {/*TODO: Change Password method */}
              <h2 className="check__form-title">Change Password</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="email">Username*</label>
                  <input
                    type="text"
                    id="price"
                    className="form-input"
                    placeholder="Your Username"
                  />
                </div>

                <div className="form-block">
                  <label for="role">Old Password*</label>
                  <input
                    type="password"
                    id="role"
                    placeholder="Old Password"
                    className="form-input"
                  />
                </div>
                <div className="form-block">
                  <label for="role">New Password*</label>
                  <input
                    type="password"
                    id="role"
                    placeholder="New Password"
                    className="form-input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={changePassword}>
                    Update
                  </button>
                </div>
              </form>
              {/*TODO: Delete method */}
              <h2 className="check__form-title">Delete Account</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Note*</label>
                  <textarea
                    type="text"
                    id="quantity"
                    placeholder="Write your reason about delete account to support me become better. Thank you and See you later !"
                    // onChange={(e) => setQuantityProduct(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={deleteHandle}>
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
