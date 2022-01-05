import "./login.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  // const [loginStatus, setLoginStatus] = useState("");
  const signin = () => {
    axios.post("http://localhost:5000/login", {
      user: user,
      password: password,
    });
    // .then((response) => {
    //   if (response.data) {
    //     setLoginStatus(response.data);
    //   } else {
    //     setLoginStatus(response.data[0].user);
    //   }
    // });
  };

  useEffect(() => {
    const fetch = async () => {
      const test = await axios.get("http://localhost:5000/login");
      console.log(test);
    };
    fetch();
  }, []);
  // console.log(loginStatus)
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
        <div className="login-text">
          <FaLock /> Password:
        </div>
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
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
