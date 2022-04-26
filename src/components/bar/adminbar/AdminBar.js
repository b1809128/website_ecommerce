import "../brandbar/brandbar.css";
import "../brandbar/tagsbar.css";
import React from "react";

export default function AdminBar() {
  return (
    <div className="tags-bar">
      <ul className="brand-bar-list">
        <li className="tag__bar-item ">
          <a
            href="#thongkedoanhso"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            Thống kê doanh số
          </a>
        </li>
        <li className="tag__bar-item ">
          <a
            href="#quanlysanpham"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            Quản lý sản phẩm
          </a>
        </li>
        <li className="tag__bar-item">
          <a
            href="#banchay"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {" "}
            Sản phẩm bán chạy
          </a>
        </li>
        <li className="tag__bar-item">
          <a
            href="#quanlynguoidung_donhang"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {" "}
            Quản lý người dùng
          </a>
        </li>
        <li className="tag__bar-item">
          <a
            href="#quanlynguoidung_donhang"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            {" "}
            Quản lý đơn hàng
          </a>
        </li>
      </ul>
    </div>
  );
}
