import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
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

  return (
    <div className={scrollTop ? "header scroll" : "header"}>
      <div className="grid wide">
        <div className="row header__main">
          <div className="header__logo">
            <img src="./images/logo.png" className="logo-image"/>
          </div>
          <div className="header__menu">
            <ul className="header__menu-list">
              <li className="header__menu-item">
                <Link className="link" href="/">
                  Home
                </Link>
              </li>
              <li className="header__menu-item">
                <a className="link" href="#categories">
                  Categories
                </a>
              </li>              
              <li className="header__menu-item">
                <a className="link" href="#services">
                  Service
                </a>
              </li>
              <li className="header__menu-item">
                <a className="link" href="#blog">
                  Blog
                </a>
              </li>
              <li className="header__menu-item">
                <a className="link" href="#footer">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div className="header__action">
            <ul className="header__menu-list">
              <li className="header__menu-item">
                <Link className="link" to="/sign-in">
                  Sign In
                </Link>
              </li>
              <li className="header__menu-item">
                <Link className="link" to="/sign-up">
                  Sign Up
                </Link>
              </li>
              <li className="header__menu-item">
                <Link className="link" to="/cart">
                  <FaShoppingCart className="cart-icon"/>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
