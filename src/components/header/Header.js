import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FaShoppingCart,
  FaTimes,
  FaBars,
  FaUserAlt,
  FaSearch,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./header.css";
import axios from "axios";

export default function Header() {
  const [scrollTop, setScrollTop] = useState(false);
  const changeBackgroundColor = () => {
    if (window.scrollY > 80) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
  };

  window.addEventListener("scroll", changeBackgroundColor);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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

  //Local Storage
  const local = localStorage.getItem("userID");
  const [localNotExist, setLocalNotExist] = useState(false);
  useEffect(() => {
    const getLocal = () =>{
      if (local) {
        setLocalNotExist(false);
      }
    }
    getLocal()
  })
  //LogOut
  var history = useHistory();
  const logout = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.get("http://localhost:5000/auth/logout");
      // console.log(res)
      if (res.data) {
        setLocalNotExist(true);
        localStorage.removeItem("userID");
        history.push("/");
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
            <img alt="" src="/images/logo.png" className="navbar-logo__image" />
          </Link>
        </div>
        <div className="menu-icon">
          <div className="menu-icon__item">
            <Link className="link" to="/sign-in">
              <FaUserAlt />
            </Link>
          </div>
          <div className="menu-icon__item">
            <Link className="link" to="/cart">
              <FaShoppingCart />
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
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="link" href="#categories" onClick={handleClick}>
              Categories
            </a>
          </li>
          <li className="nav-item">
            <a className="link" href="#services" onClick={handleClick}>
              Service
            </a>
          </li>
          <li className="nav-item">
            <a className="link" href="#blog" onClick={handleClick}>
              Blog
            </a>
          </li>
          <li className="nav-item">
            <a className="link" href="#footer" onClick={handleClick}>
              About Us
            </a>
          </li>
        </ul>
        {/* --- */}
        <ul className="nav-menu">
          <li className="">
            <form className="nav-bar__form">
              <input
                type="text"
                className="nav-bar__form-input"
                placeholder="Search"
                name="search"
              />
              <button className="nav-bar__form-submit" type="submit">
                <FaSearch className="nav-bar-icon" />
              </button>
            </form>
          </li>
          {!localNotExist ? (
            <li className="nav-item">
              <Link className="link" to="/profile">
                {local}
              </Link>
            </li>
          ) : (
            <li className="nav-item" style={{ display: "none" }}>
              <Link className="link" to="/sign-in">
                {local}
              </Link>
            </li>
          )}
          {!localNotExist ? (
            (
              <li className="nav-item" style={{ display: "none" }}>
                <Link className="link" to="/sign-in">
                  <FaUserAlt />
                </Link>
              </li>
            ) && (
              <li className="nav-item">
                <div className="link" onClick={logout}>
                  <FiLogOut />
                </div>
              </li>
            )
          ) : (
            <li className="nav-item">
              <Link className="link" to="/sign-in">
                <FaUserAlt />
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link className="link" to="/cart">
              <FaShoppingCart />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
