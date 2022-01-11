import "./login.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import crypto from "crypto";
import { AuthContext } from "../../../context/AuthContext";
export default function LoginForm() {
  //Can [ref,useRef] to no replace values after action
  const [userRef, setUserRef] = useState("");
  const [password, setPassword] = useState("");
  const [validateUser, setValidateUser] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [stateUser, setStateUser] = useState(false);
  const [statePassword, setStatePassword] = useState(false);

  //Redirect
  const history = useHistory();

  //Context API
  const { dispatch } = useContext(AuthContext);

  //Log In
  const signin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      if (!userRef) {
        setStateUser(true);
      } else if (!password) {
        setStatePassword(true);
      } else {
        var hashPash = crypto.createHash("md5").update(password).digest("hex");
        const res = await axios.post("http://localhost:5000/auth/login", {
          user: userRef,
          password: hashPash,
        });
        if (res.data.wrongUser) {
          setValidateUser(true);
        } else if (res.data.wrongPassword) {
          setValidatePassword(true);
        } else {
          // localStorage.setItem("userID", res.data.result[0].user);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          history.push("/");
        }
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  // console.log(user)

  return (
    <div className="login-wrapper">
      <form className="login-form">
        <h3 className="login-text-none">Sign In</h3>
        <div className="login-text">
          <FaUserAlt /> Username:
        </div>
        <input
          type="text"
          placeholder="Email or Username"
          className="login-input"
          onChange={(e) => setUserRef(e.target.value)}
        />
        {stateUser ? (
          <div className="login-validate" style={{ display: "flex" }}>
            <TiDelete />
            Information must be filled out!
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Information must be filled out!
          </div>
        )}
        {validateUser ? (
          <div className="login-validate" style={{ display: "flex" }}>
            <TiDelete />
            Incorrect user. Please try again !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Incorrect user. Please try again !
          </div>
        )}
        <div className="login-text">
          <FaLock /> Password:
        </div>
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        {statePassword ? (
          <div className="login-validate" style={{ display: "flex" }}>
            <TiDelete />
            Information must be filled out !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Information must be filled out!
          </div>
        )}
        {validatePassword ? (
          <div className="login-validate" style={{ display: "flex" }}>
            <TiDelete />
            Incorrect password. Please try again !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Incorrect password. Please try again !
          </div>
        )}
        <p className="login-text-none link"> Forget Password</p>
        <button className="btn" onClick={signin}>
          Sign In
        </button>
        <p className="login-text-none">
          {" "}
          Don't have an account ?{" "}
          <span>
            <Link className="link" to="/sign-up">
              Sign Up
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
