import "./footer.css";
import "aos/dist/aos.css";
import Aos from "aos";
import React, { useEffect } from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";

function Footer() {
  //To get Animation with Aos library
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="footer-container" id="footer">
      <div className="footer-first-content">
        <div className="footer-search-content-text">
          <p className="footer-search-content-text-item">
            FREE SHIPPING INNER CITY
          </p>
          <p className="footer-search-content-text-item">
            100% MONEY BACK GUARANTEE
          </p>
          <p className="footer-search-content-text-item">
            MANY PAYMENT GATEWAYS
          </p>
          <p className="footer-search-content-text-item">24/7 ONLINE SUPPORT</p>
        </div>
        <div data-aos="fade-up">
          <form className="footer-search-content-form" action="">
            <input
              type="text"
              placeholder="Your Email"
              className="footer-search-content-input"
            />
            <button className="btn">Get Discount Code</button>
          </form>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <a href="/sign-up">How it works</a>
            <a href="/">Careers</a>
            <a href="/">Investors</a>
            <a href="/">Terms of Service</a>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <a href="/">Contact</a>
            <a href="/">Support</a>
            <a href="/">Destinations</a>
            <a href="/">Sponsorships</a>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Videos</h2>
            <a href="/">Submit Video</a>
            <a href="/">Ambassadors</a>
            <a href="/">Agency</a>
            <a href="/">Influencer</a>
          </div>
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <a href="/">Instagram</a>
            <a href="/">Facebook</a>
            <a href="/">Youtube</a>
            <a href="/">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-end-content">
        <div className="footer-end-content-copyright">
          Copyright 2021 by QuocHuy's Developer
        </div>
        <div className="footer-end-content-social">
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
  );
}

export default Footer;
