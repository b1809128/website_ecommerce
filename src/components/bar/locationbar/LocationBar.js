import "./locationbar.css";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LocationBar({ nameProduct }) {
  //Spit / URL and get location
  const location = window.location.pathname.split("/");

  const urlArray = [
    "tat-ca-san-pham",
    "chi-tiet-san-pham",
    "gio-hang",
    "thanh-toan",
    "chi-tiet-don-hang",
    "thong-tin-khach-hang",
    "tim-kiem",
    "tin-cong-nghe",
    "quan-ly-don-hang",
    "admin",
    "gioi-thieu",
  ];
  const urlTranslate = [
    "Tất Cả Sản Phẩm",
    "Chi Tiết Sản Phẩm",
    "Giỏ Hàng",
    "Thanh Toán",
    "Chi Tiết Đơn Hàng",
    "Thông Tin Khách Hàng",
    "Tìm Kiếm",
    "Tin Công Nghệ",
    "Quản Lý Đơn Hàng",
    "Admin",
    "Giới Thiệu",
  ];

  const languageVn = () => {
    let translate;
    for (let i = 0; i < urlTranslate.length; i++) {
      if (urlArray[i] === location[1]) {
        translate = urlTranslate[i];
      }
    }
    return translate;
  };

  // console.log(product);

  return (
    <div className="location-bar">
      <ul className="location-bar-list">
        <li className="location-bar-item">
          <Link to="/" className="location-bar-item__link">
            Trang Chủ
          </Link>{" "}
          <FaAngleRight />
        </li>
        <li className="location-bar-item">
          <Link to={location[1]} className="location-bar-item__link">
            {languageVn()}
          </Link>
        </li>
        <li className="location-bar-item">
          <FaAngleRight />
        </li>
        <li className="location-bar-item">
          <Link to={location[2]} className="location-bar-item__link">
            {nameProduct}
          </Link>
        </li>
      </ul>
    </div>
  );
}
