import "./login.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import crypto from "crypto";
export default function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  //Redirect
  const history = useHistory();

  const signin = async (e) => {
    e.preventDefault();
    try {
      var hashPash = crypto.createHash("md5").update(password).digest("hex");
      const res = await axios.post("http://localhost:5000/auth/login", {
        user: user,
        password: hashPash,
      });
      if (res.data.wrongPassword || res.data.wrongUser) {
        setValidate(true);
      } else {
        setValidate(false);
        localStorage.setItem("userID", res.data.result[0].user);
        history.push("/");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
          onChange={(e) => setUser(e.target.value)}
        />
        {validate ? (
          <div className="login-validate" style={{ display: "flex" }}>
            <TiDelete />
            Incorrect user or password. Please try again !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Incorrect user or password. Please try again !
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
        {validate ? (
          <div className="login-validate" style={{ display: "flex" }}>
            <TiDelete />
            Incorrect user or password. Please try again !
          </div>
        ) : (
          <div className="login-validate">
            <TiDelete />
            Incorrect user or password. Please try again !
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
