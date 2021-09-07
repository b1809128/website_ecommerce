import "./login.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
export default function LoginForm() {
  return (
    <div className="login-wrapper">
      <form className="login-form">
        
        <div className="login-text">
          <FaUserAlt />  User:
        </div>
        <input
          type="text"
          placeholder="Gmail or Username"
          className="login-input"
        />
        <div className="login-text">
          <FaLock />  Password:
        </div>
        <input type="password" placeholder="Password" className="login-input" />
        <p className="login-text-none link"> Forget Password</p>
        <button className="btn">Sign In</button>
        <p className="login-text-none"> Don't have an account ? <span className="link">Sign Up</span></p>
      </form>
    </div>
  );
}
