import "./brandbar.css";
import "./tagsbar.css";
import React from "react";
import { FaMobileAlt, FaHeadphonesAlt, FaLaptop } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TagsBar() {
  return (
    <div className="tags-bar">
      <ul className="brand-bar-list">
        <li className="tag__bar-item ">
          <Link
            to="/tat-ca-san-pham?search=phone"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <FaMobileAlt className="tag__bar-icon" /> Điện Thoại
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?search=tablet"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {" "}
            <FaMobileAlt className="tag__bar-icon" /> Tablet
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?search=watch"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {" "}
            <FaMobileAlt className="tag__bar-icon" /> Đồng Hồ Thông Minh
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?search=headphone"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {" "}
            <FaHeadphonesAlt className="tag__bar-icon" /> Tai Nghe, Phụ Kiện
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?search=laptop"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {" "}
            <FaLaptop className="tag__bar-icon" /> Laptop
          </Link>
        </li>
      </ul>
    </div>
  );
}
