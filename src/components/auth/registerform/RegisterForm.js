import "./register.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [userReg, setUserReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordReg2, setPasswordReg2] = useState("");

  const [stateUser, setStateUser] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [statePassword, setStatePassword] = useState(false);
  const [hidePasswordInput, setHidePasswordInput] = useState(true);

  //Get API Customer
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await axios.get("http://localhost:5000/manage/api");
        setCustomerData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  });

  //Register function
  const register = async (e) => {
    e.preventDefault();
    try {
      if (!userReg) {
        setStateUser(true);
        // setTimeout(() =>setStateUser(true),3000)
      } else if (!passwordReg || !passwordReg2) {
        setStatePassword(true);
      } else if (userReg) {
        const testCustomerData = customerData.filter(
          (data) => data.user === userReg
        );
        if (testCustomerData.length > 0) {
          setUserExist(true);
        } else {
          await axios.post("http://localhost:5000/auth/register", {
            user: userReg,
            password: passwordReg,
          });
          getAlert();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Redirect
  const history = useHistory();
  const getAlert = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Register Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    history.push("/dang-nhap");
  };

  return (
    <div className="register-wrapper">
      <form className="register-form">
        <h3 className="register-text-none">ĐĂNG KÝ</h3>
        <div className="register-text">
          <FaUserAlt /> Tên tài khoản:
        </div>
        <input
          type="text"
          placeholder="Email or Username"
          className="register-input"
          onChange={(e) => setUserReg(e.target.value)}
        />
        {stateUser ? (
          <div
            className="register-validate"
            style={{ display: "flex" }}
            onClick={() => setStateUser(false)}
          >
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        ) : (
          <div className="register-validate">
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        )}
        {userExist ? (
          <div
            className="register-validate"
            style={{ display: "flex" }}
            onClick={() => setUserExist(false)}
          >
            <TiDelete />
            Tên tài khoản không hợp lệ!
          </div>
        ) : (
          <div className="register-validate">
            <TiDelete />
            Tên tài khoản không hợp lệ!
          </div>
        )}
        <div className="register-text">
          <FaLock /> Mật khẩu:
        </div>
        {!hidePasswordInput ? (
          <div className="register-password-wrapper">
            <input
              type="text"
              placeholder="Password"
              className="login-password-input"
              onChange={(e) => setPasswordReg(e.target.value)}
            />
            <AiFillEyeInvisible
              className="register-password-icon"
              onClick={() => setHidePasswordInput(true)}
            />
          </div>
        ) : (
          <div className="register-password-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="register-password-input"
              onChange={(e) => setPasswordReg(e.target.value)}
            />
            <AiFillEye
              className="register-password-icon"
              onClick={() => setHidePasswordInput(false)}
            />
          </div>
        )}
        {statePassword ? (
          <div
            className="register-validate"
            style={{ display: "flex" }}
            onClick={() => setStatePassword(false)}
          >
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        ) : (
          <div className="register-validate">
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        )}
        <div className="register-text">
          <FaLock /> Xác nhận mật khẩu:
        </div>
        {!hidePasswordInput ? (
          <div className="register-password-wrapper">
            <input
              type="text"
              placeholder="Password"
              className="login-password-input"
              onChange={(e) => setPasswordReg2(e.target.value)}
            />
            <AiFillEyeInvisible
              className="register-password-icon"
              onClick={() => setHidePasswordInput(true)}
            />
          </div>
        ) : (
          <div className="register-password-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="register-password-input"
              onChange={(e) => setPasswordReg2(e.target.value)}
            />
            <AiFillEye
              className="register-password-icon"
              onClick={() => setHidePasswordInput(false)}
            />
          </div>
        )}
        {statePassword ? (
          <div
            className="register-validate"
            style={{ display: "flex" }}
            onClick={() => setStatePassword(false)}
          >
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        ) : (
          <div className="register-validate">
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        )}
        <div className="register-btn">
          <button onClick={register} className="btn">
           ĐĂNG KÝ
          </button>
        </div>
        <p className="register-text-none">
          {" "}
          Bạn đã có tài khoản?{" "}
          <span style={{ paddingLeft: "10px" }}>
            <Link className="link" to="/dang-nhap">
              Đăng Nhập
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
