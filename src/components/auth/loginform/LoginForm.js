import "./login.css";
import { FaUserAlt, FaLock, FaFacebookSquare } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import crypto from "crypto";
import { AuthContext } from "../../../context/AuthContext";
// import GoogleLoginForm from "./GoogleLoginForm";
import { FcGoogle } from "react-icons/fc";
export default function LoginForm() {
  //Can [ref,useRef] to no replace values after action
  const [userRef, setUserRef] = useState("");
  const [password, setPassword] = useState("");
  const [validateUser, setValidateUser] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [stateUser, setStateUser] = useState(false);
  const [statePassword, setStatePassword] = useState(false);
  const [hidePasswordInput, setHidePasswordInput] = useState(true);
  //Redirect
  const history = useHistory();

  //Context API
  const { dispatch } = useContext(AuthContext);

  //Log In function
  const signin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      if (!userRef) {
        setStateUser(true);
      } else if (!password) {
        setStatePassword(true);
      } else {
        var hashPass = crypto.createHash("md5").update(password).digest("hex");
        const res = await axios.post("http://localhost:5000/auth/login", {
          user: userRef,
          password: hashPass,
        });
        if (res.data.wrongUser) {
          setValidateUser(true);
        } else if (res.data.wrongPassword) {
          setValidatePassword(true);
        } else {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          history.push("/");
        }
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const googleSignIn = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
    // const result = await axios.get(
    //   "http://localhost:5000/auth/google/login/success"
    // );
    // if (result) {
    //   dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
    // }
  };

  const facebookSignIn = async () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <h3 className="login-text-none">ĐĂNG NHẬP</h3>
        <div className="login-text">
          <FaUserAlt /> Tên đăng nhập:
        </div>
        <input
          type="text"
          placeholder="Email or Username"
          className="login-input"
          onChange={(e) => setUserRef(e.target.value)}
        />
        {stateUser ? (
          <div
            className="login-validate"
            style={{ display: "flex" }}
            onClick={() => setStateUser(false)}
          >
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        )}
        {validateUser ? (
          <div
            className="login-validate"
            style={{ display: "flex" }}
            onClick={() => setValidateUser(false)}
          >
            <TiDelete />
            Tên người dùng sai. Vui lòng thử lại !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Tên người dùng sai. Vui lòng thử lại !
          </div>
        )}
        <div className="login-text">
          <FaLock /> Mật khẩu:
        </div>
        {!hidePasswordInput ? (
          <div className="login-password-wrapper">
            <input
              type="text"
              placeholder="Password"
              className="login-password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <AiFillEyeInvisible
              className="login-password-icon"
              onClick={() => setHidePasswordInput(true)}
            />
          </div>
        ) : (
          <div className="login-password-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="login-password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <AiFillEye
              className="login-password-icon"
              onClick={() => setHidePasswordInput(false)}
            />
          </div>
        )}
        {statePassword ? (
          <div
            className="login-validate"
            style={{ display: "flex" }}
            onClick={() => setStatePassword(false)}
          >
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Điền thông tin vào ô trống !
          </div>
        )}
        {validatePassword ? (
          <div
            className="login-validate"
            style={{ display: "flex" }}
            onClick={() => setValidatePassword(false)}
          >
            <TiDelete />
            Sai mật khẩu. Vui lòng thử lại !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Sai mật khẩu. Vui lòng thử lại !
          </div>
        )}
        <p className="login-text-none link"> Quên mật khẩu</p>
        <button className="btn" onClick={signin}>
          ĐĂNG NHẬP
        </button>

        <div className="login-btn-social">
          {/* <GoogleLoginForm></GoogleLoginForm> */}
          <button className="btn-login" onClick={googleSignIn}>
            <FcGoogle style={{ fontSize: "1.4rem", margin: "5px" }} />
            Đăng nhập với Google
          </button>
          <button className="btn-login" onClick={facebookSignIn}>
            <FaFacebookSquare
              style={{ color: "#1877f2", fontSize: "1.4rem", margin: "5px" }}
            />
            Đăng nhập với Facebook
          </button>
        </div>

        <p className="login-text-none">
          {" "}
          Bạn chưa có tài khoản ?{" "}
          <span style={{ paddingLeft: "10px" }}>
            <Link className="link" to="/dang-ky">
              Đăng Ký
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
