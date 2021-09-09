import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaBars, FaUserAlt,FaSearch } from "react-icons/fa";
import "./header.css";

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


  // const [clickElement, setClickElement] = useState(false);
  // const handleClickElement = () => setClickElement(!clickElement);

  return (
    <div className={scrollTop ? "navbar scroll": "navbar"}>
      <div className="navbar-container container">
          <div className="navbar-logo" onClick={closeMobileMenu}>
            <img src="./images/logo.png" className="navbar-logo__image" />
          </div>
          <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
          {/* --- */}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <a className="link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="link" href="#categories">
                  Categories
                </a>
              </li>
              <li className="nav-item">
                <a className="link" href="#services">
                  Service
                </a>
              </li>
              <li className="nav-item">
                <a className="link" href="#blog">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="link" href="#footer">
                  About Us
                </a>
              </li>
            </ul>
            {/* --- */}
            <ul className="nav-menu">
              <li className="nav-item">
                <Link className="link" to="/search">
                  <FaSearch/>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="link" to="/sign-in">
                  <FaUserAlt/>
                </Link>
              </li>
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
