import "./register.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router";
import { useState } from "react";
import axios from "axios";
export default function RegisterForm() {
  const [userReg, setUserReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  // const [regStatus, setRegStatus] = useState("");
  const register = async () => {
    await axios
      .post("http://localhost:5000/auth/register", {
        user: userReg,
        password: passwordReg,
      })
      // .then((response) => {
      //   if (response) {
      //     setRegStatus(true);
      //   }
      // });
  };
  // if (regStatus) return <Redirect to="/" />;
  // console.log(regStatus)
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
        <div className="register-text">
          <FaLock /> Password:
        </div>
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          onChange={(e) => setPasswordReg(e.target.value)}
        />
        <div className="register-text">
          <FaLock /> Confirm Password:
        </div>
        <input type="text" placeholder="Password" className="register-input" />
        <div className="register-btn">
          <button onClick={register} className="btn">
            Sign Up
          </button>
        </div>
        <p className="register-text-none">
          {" "}
          Already have account ?{" "}
          <span>
            <Link className="link" to="/sign-in">
              Sign In
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
}
