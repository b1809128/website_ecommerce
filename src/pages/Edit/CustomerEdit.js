import "./edit.css";
import "../CheckOut/checkout.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import crypto from "crypto";
import Swal from "sweetalert2";
export default function CustomerEdit() {
  const { user, dispatch } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const history = useHistory();

  //TODO: Auto fetchAPI
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAPI = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/profile", {
        token: user.token,
      });
      if (res1.data.logged) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };
    fetchAPI();
  }, [user.token]);

  //TODO: Create Product function
  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  //FIXME: Must be parse to JSON after push to server
  const createHandle = async () => {
    // e.preventDefault();
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added Address Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Update Password function
  const [password, setPassword] = useState("");
  const changePassword = async (e) => {
    e.preventDefault();
    var hashPash = crypto.createHash("md5").update(password).digest("hex");
    try {
      const res = await axios.patch(
        `http://localhost:5000/manage/customer/updateonly/${user.result[0].id}`,
        {
          password: hashPash,
        }
      );

      if (res.data) {
        Swal.fire(
          "Change password successfully !",
          "You clicked the button!",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Delete Product function
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
          redirectAfterDelete();
        }
      });
    }
  };

  const redirectAfterDelete = async () => {
    try {
      history.push("/sign-up");
      dispatch({ type: "LOGOUT" });
      await axios.delete(
        `http://localhost:5000/customer/delete/${user.result[0].id}`
      );
      await axios.get("http://localhost:5000/auth/logout");
    } catch (error) {
      console.log(error);
    }
  };

  if (!authorized) {
    return <Redirect to="/sign-in" />;
  }
  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <div className="row">
            <div className="check__form">
              {/*TODO: Address method */}
              <h2 className="check__form-title">ĐỊA CHỈ GIAO HÀNG</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Họ tên*</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    className="form-input"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-block">
                  <label for="name">Số điện thoại*</label>
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
                  <label for="adress">Địa chỉ*</label>
                  <textarea
                    type="text"
                    id="quantity"
                    placeholder="29/13, 30/4 Street, Ninh Kieu District, Can Tho City"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={createHandle}>
                    THÊM
                  </button>
                  <button className="btn">CẬP NHẬT</button>
                </div>
              </form>
            </div>
            <div className="check__method">
              {/*TODO: Change Password method */}
              <h2 className="check__form-title">ĐỔI MẬT KHẨU</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="email">Tên đăng nhập*</label>
                  <input
                    type="text"
                    id="price"
                    className="form-input"
                    placeholder="Your Username"
                  />
                </div>

                <div className="form-block">
                  <label for="role">Mật khẩu cũ*</label>
                  <input
                    type="password"
                    id="role"
                    placeholder="Old Password"
                    className="form-input"
                  />
                </div>
                <div className="form-block">
                  <label for="role">Mật khẩu mới*</label>
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
                    CẬP NHẬT
                  </button>
                </div>
              </form>
              {/*TODO: Delete method */}
              <h2 className="check__form-title">XÓA TÀI KHOẢN</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Ghi chú*</label>
                  <textarea
                    type="text"
                    id="quantity"
                    placeholder="Write your reason about delete account to support me become better. Thank you and See you later !"
                    // onChange={(e) => setQuantityProduct(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={deleteHandle}>
                    XÓA TÀI KHOẢN
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
