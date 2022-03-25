import "./header.css";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FaShoppingCart,
  FaTimes,
  FaBars,
  FaUserAlt,
  FaSearch,
  FaUserCheck,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Header({ cartItems, deleteCartCheckOut }) {
  const [scrollTop, setScrollTop] = useState(false);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  //Change background color when scrolling
  const changeBackgroundColor = () => {
    if (window.scrollY > 80) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
  };

  //Window effect when scroll
  window.addEventListener("scroll", changeBackgroundColor);

  //Onclick Handle function
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  useEffect(() => {
    showButton();
  }, []);

  //Local Storage -> Context API
  const { user, dispatch } = useContext(AuthContext);

  //LogOut
  var history = useHistory();
  const logout = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get("http://localhost:5000/auth/logout");
      // console.log(res)
      if (res.data) {
        deleteCartCheckOut();
        history.push("/");
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={scrollTop ? "navbar scroll" : "navbar"}>
      <div className="navbar-container container">
        <div className="navbar-logo" onClick={closeMobileMenu}>
          <Link to="/">
            <img
              alt=""
              src="/images/logo/logo.png"
              className="navbar-logo__image"
            />
          </Link>
        </div>
        <div className="menu-icon">
          <div className="menu-icon__item">
            <Link className="link" to="/dang-nhap">
              <FaUserAlt />
            </Link>
          </div>
          <div className="menu-icon__item">
            <Link className="link relative__cart-number" to="/gio-hang">
              <FaShoppingCart />
              <div className="absolute__cart-number">{cartItems}</div>
            </Link>
          </div>
          <div className="menu-icon__item">
            {click ? (
              <FaTimes onClick={handleClick} />
            ) : (
              <FaBars onClick={handleClick} />
            )}
          </div>
        </div>
        {/* --- */}
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a className="link" href="/" onClick={handleClick}>
              Trang Chủ
            </a>
          </li>
          <li className="nav-item">
            <Link to="/tat-ca-san-pham" className="link" onClick={handleClick}>
              Sản Phẩm
            </Link>
          </li>
          <li className="nav-item">
            <a className="link" href="#blog" onClick={handleClick}>
              Bài Viết
            </a>
          </li>
          <li className="nav-item">
            <a className="link" href="#services" onClick={handleClick}>
              Dịch Vụ
            </a>
          </li>
          <li className="nav-item">
            <a className="link" href="#footer" onClick={handleClick}>
              Giới Thiệu
            </a>
          </li>
        </ul>
        {/* --- */}
        {user ? (
          <ul className="nav-menu">
            <li className="">
              <form action="/tim-kiem" method="get" className="nav-bar__form">
                <input
                  type="text"
                  className="nav-bar__form-input"
                  placeholder="Tìm kiếm"
                  name="search"
                />
                <button className="nav-bar__form-submit">
                  <FaSearch className="nav-bar-icon" />
                </button>
              </form>
            </li>

            <li className="nav-item">
              <FaUserCheck />
              <Link className="link" to="/thong-tin-khach-hang">
                {user.result[0].user}
              </Link>
            </li>

            <li className="nav-item">
              <div className="link" onClick={logout}>
                <FiLogOut />
              </div>
            </li>

            <li className="nav-item">
              <Link className="link relative__cart-number" to="/gio-hang">
                <FaShoppingCart />
                <div className="absolute__cart-number">{cartItems}</div>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu">
            <li className="">
              <form action="/tim-kiem" method="get" className="nav-bar__form">
                <input
                  type="text"
                  className="nav-bar__form-input"
                  placeholder="Tìm kiếm"
                  name="search"
                />
                <button className="nav-bar__form-submit">
                  <FaSearch className="nav-bar-icon" />
                </button>
              </form>
            </li>

            <li className="nav-item">
              <Link className="link" to="/dang-nhap">
                <FaUserAlt />
              </Link>
            </li>

            <li className="nav-item">
              <Link className="link relative__cart-number" to="/gio-hang">
                <FaShoppingCart />
                <div className="absolute__cart-number">{cartItems}</div>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
