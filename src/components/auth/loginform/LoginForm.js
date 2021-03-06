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
        <h3 className="login-text-none">????NG NH???P</h3>
        <div className="login-text">
          <FaUserAlt /> T??n ????ng nh???p:
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
            ??i???n th??ng tin v??o ?? tr???ng !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            ??i???n th??ng tin v??o ?? tr???ng !
          </div>
        )}
        {validateUser ? (
          <div
            className="login-validate"
            style={{ display: "flex" }}
            onClick={() => setValidateUser(false)}
          >
            <TiDelete />
            T??n ng?????i d??ng sai. Vui l??ng th??? l???i !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            T??n ng?????i d??ng sai. Vui l??ng th??? l???i !
          </div>
        )}
        <div className="login-text">
          <FaLock /> M???t kh???u:
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
            ??i???n th??ng tin v??o ?? tr???ng !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            ??i???n th??ng tin v??o ?? tr???ng !
          </div>
        )}
        {validatePassword ? (
          <div
            className="login-validate"
            style={{ display: "flex" }}
            onClick={() => setValidatePassword(false)}
          >
            <TiDelete />
            Sai m???t kh???u. Vui l??ng th??? l???i !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Sai m???t kh???u. Vui l??ng th??? l???i !
          </div>
        )}
        <p className="login-text-none link"> Qu??n m???t kh???u</p>
        <button className="btn" onClick={signin}>
          ????NG NH???P
        </button>

        <div className="login-btn-social">
          {/* <GoogleLoginForm></GoogleLoginForm> */}
          <button className="btn-login" onClick={googleSignIn}>
            <FcGoogle style={{ fontSize: "1.4rem", margin: "5px" }} />
            ????ng nh???p v???i Google
          </button>
          <button className="btn-login" onClick={facebookSignIn}>
            <FaFacebookSquare
              style={{ color: "#1877f2", fontSize: "1.4rem", margin: "5px" }}
            />
            ????ng nh???p v???i Facebook
          </button>
        </div>

        <p className="login-text-none">
          {" "}
          B???n ch??a c?? t??i kho???n ?{" "}
          <span style={{ paddingLeft: "10px" }}>
            <Link className="link" to="/dang-ky">
              ????ng K??
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
