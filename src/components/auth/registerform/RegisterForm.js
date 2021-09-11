import "./register.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {Link} from "react-router-dom";
export default function RegisterForm(){
    return (
        <div className="register-wrapper">
      <form className="register-form">
        <h3 className="register-text-none">Sign Up</h3>
        <div className="register-text">
          <FaUserAlt />  Username:
        </div>
        <input
          type="text"
          placeholder="Email or Username"
          className="register-input"
        />
        <div className="register-text">
          <FaLock />  Password:
        </div>
        <input type="password" placeholder="Password" className="register-input" />
        <div className="register-text">
          <FaLock /> Confirm Password:
        </div>
        <input type="password" placeholder="Password" className="register-input" />
        <button className="btn">Sign Up</button>
        <p className="register-text-none"> Already have account ? <span><Link className="link" to="/sign-in">Sign In</Link></span></p>
      </form>
    </div>
    );
}