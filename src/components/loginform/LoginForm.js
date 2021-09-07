import "./login.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {Link} from "react-router-dom";
export default function LoginForm() {
  return (
    <div className="login-wrapper">
      <form className="login-form">
        <h3 className="login-text-none">Sign In</h3>
        <div className="login-text">
          <FaUserAlt />  Username:
        </div>
        <input
          type="text"
          placeholder="Email or Username"
          className="login-input"
        />
        <div className="login-text">
          <FaLock />  Password:
        </div>
        <input type="password" placeholder="Password" className="login-input" />
        <p className="login-text-none link"> Forget Password</p>
        <button className="btn">Sign In</button>
        <p className="login-text-none"> Don't have an account ? <span><Link className="link" to="/sign-up">Sign Up</Link></span></p>
      </form>
    </div>
  );
}
