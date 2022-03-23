import "./register.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [userReg, setUserReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [stateUser, setStateUser] = useState(false);
  const [statePassword, setStatePassword] = useState(false);
  const [hidePasswordInput, setHidePasswordInput] = useState(true);

  //Register function
  const register = async (e) => {
    e.preventDefault();
    try {
      if (!userReg) {
        setStateUser(true);
      } else if (!passwordReg) {
        setStatePassword(true);
      } else if (userReg === "admin") {
        setStateUser(true);
      } else {
        const res = await axios.post("http://localhost:5000/auth/register", {
          user: userReg,
          password: passwordReg,
        });
        console.log(res);
        getAlert();
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
    history.push("/sign-in");
  };

  return (
    <div className="register-wrapper">
      <form className="register-form">
        <h3 className="register-text-none">Sign Up</h3>
        <div className="register-text">
          <FaUserAlt /> Username:
        </div>
        <input
          type="text"
          placeholder="Email or Username"
          className="register-input"
          onChange={(e) => setUserReg(e.target.value)}
        />
        {stateUser ? (
          <div className="register-validate" style={{ display: "flex" }}>
            <TiDelete />
            Information must be filled out!
          </div>
        ) : (
          <div className="register-validate">
            <TiDelete />
            Information must be filled out!
          </div>
        )}
        <div className="register-text">
          <FaLock /> Password:
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
          <div className="register-validate" style={{ display: "flex" }}>
            <TiDelete />
            Information must be filled out!
          </div>
        ) : (
          <div className="register-validate">
            <TiDelete />
            Information must be filled out!
          </div>
        )}
        <div className="register-text">
          <FaLock /> Confirm Password:
        </div>
        {!hidePasswordInput ? (
          <div className="register-password-wrapper">
            <input
              type="text"
              placeholder="Password"
              className="login-password-input"
              // onChange={(e) => setPasswordReg(e.target.value)}
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
              // onChange={(e) => setPasswordReg(e.target.value)}
            />
            <AiFillEye
              className="register-password-icon"
              onClick={() => setHidePasswordInput(false)}
            />
          </div>
        )}
        <div className="register-btn">
          <button onClick={register} className="btn">
            Sign Up
          </button>
        </div>
        <p className="register-text-none">
          {" "}
          Already have account ?{" "}
          <span style={{paddingLeft:"16px"}}>
            <Link className="link" to="/sign-in">
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
