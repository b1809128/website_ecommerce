import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaGoogle,
  FaConnectdevelop,
} from "react-icons/fa";
import "./footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className="footer-first-content">
              <p className="footer-search-content-text">
                Join to our exclusive membership to receive the latest news and
                trends
              </p>
              <h3>Subscribe get more courses exciting.</h3>
              <form className="footer-search-content-form" action="">
                <input
                  type="text"
                  placeholder="Your Email"
                  className="footer-search-content-input"
                />
                <button className="btn">Get Discount Code</button>
              </form>
            </div>
            <div className="footer-main-content">
              <div className="">
                <h3 className="title">About Us</h3>
                <ul className="title-list">
                  <li className="title-item">How it works </li>
                  <li className="title-item">Career</li>
                  <li className="title-item">Investor</li>
                  <li className="title-item">Terms of Service</li>
                </ul>
              </div>
              <div className="">
                <h3 className="title">Contact Us</h3>
                <ul className="title-list">
                  <li className="title-item">Contact </li>
                  <li className="title-item">Support</li>
                  <li className="title-item">Destination</li>
                </ul>
              </div>
              <div className="">
                <h3 className="title">Products</h3>
                <ul className="title-list">
                  <li className="title-item">Phone</li>
                  <li className="title-item">Laptop</li>
                  <li className="title-item">Headphone</li>
                  <li className="title-item">Watch</li>
                </ul>
              </div>
              <div className="">
                <h3 className="title">Social Media</h3>
                <ul className="title-list">
                  <li className="title-item">Instagram </li>
                  <li className="title-item">Facebook</li>
                  <li className="title-item">Youtube</li>
                  <li className="title-item">Google</li>
                </ul>
              </div>
            </div>

            <div className="footer-end-content">
              <div className="footer-end-content-logo">
                <img src="./images/logo.png" className="footer-end-content-logo__img"/>
                <img src="./images/logo_apple.jpg" className="footer-end-content-logo__img"/>
                <img src="./images/logo_tma.png" className="footer-end-content-logo__img"/>
                <img src="./images/logo_fpt.png" className="footer-end-content-logo__img"/>
              </div>
              <div className="footer-end-content-copyright">
                Copyright 2021 by QuocHuy's Developer
              </div>
              <div className="footer-end-content-social ">
                <div className="footer-end-content-social-item">
                  <FaFacebookSquare />
                </div>
                <div className="footer-end-content-social-item">
                  <FaInstagram />
                </div>
                <div className="footer-end-content-social-item">
                  <FaYoutube />
                </div>
                <div className="footer-end-content-social-item">
                  <FaGoogle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
