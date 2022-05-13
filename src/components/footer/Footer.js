import "./footer.css";
import "aos/dist/aos.css";
import Aos from "aos";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";
import Swal from "sweetalert2";

function Footer() {
  const [mail, setMail] = useState("");
  //To get Animation with Aos library
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  const contactSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/customer/send-mail", {
      mailtext: mail,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thông tin mới nhất về sản phẩm sẽ được gửi đến bạn !",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="footer-container" id="footer">
      <div className="footer-first-content">
        <div className="footer-search-content-text">
          <p className="footer-search-content-text-item">
            MIỄN PHÍ GIAO HÀNG NỘI Ô THÀNH PHỐ
          </p>
          <p className="footer-search-content-text-item">
            100% HOÀN TIỀN KHI SẢN PHẨM LỖI
          </p>
          <p className="footer-search-content-text-item">
            NHIỀU HÌNH THỨC THANH TOÁN
          </p>
          <p className="footer-search-content-text-item">
            HỖ TRỢ TRỰC TUYẾN 24/7
          </p>
        </div>
        <div data-aos="fade-up">
          <form className="footer-search-content-form" action="">
            <input
              type="text"
              placeholder="Your Email"
              className="footer-search-content-input"
              onChange={(e) => setMail(e.target.value)}
            />
            <button className="btn" onClick={contactSubmit}>
              NHẬN THÔNG BÁO
            </button>
          </form>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Giới thiệu</h2>
            <a href="/sign-up">Hoạt động kinh doanh</a>
            <a href="/">Nghề nghiệp</a>
            <a href="/">Nhà đầu tư</a>
            <a href="/">Điều khoản dịch vụ</a>
          </div>
          <div className="footer-link-items">
            <h2>Tương tác</h2>
            <a href="/">Tương tác</a>
            <a href="/">Hỗ trợ</a>
            <a href="/">Địa điểm</a>
            <a href="/">Tài trợ</a>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Videos</h2>
            <a href="/">Submit Video</a>
            <a href="/">Đại sứ thương hiệu</a>
            <a href="/">Đại lý</a>
            <a href="/">Tầm ảnh hưởng</a>
          </div>
          <div className="footer-link-items">
            <h2>Mạng xã hội</h2>
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
