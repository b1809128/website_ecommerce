/* eslint-disable jsx-a11y/alt-text */
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./comment.css";

export default function Comment() {
  return (
    <div className="comment">
      <div className="comment-image">
        <img
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-card-50-applecard-202112?wid=480&hei=500&fmt=png-alpha&.v=1639529636000"
          className="comment-image__img"
        />
      </div>
      <p className="comment-text">
        Đây là một cửa hàng công nghệ tốt nhất với nhiều dịch vụ cho khách hàng
      </p>
      <p className="comment-star">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalf />
      </p>
      <div className="comment-link">
        <Link to="/tin-cong-nghe" className="comment-link__text">
          Đọc tiếp...
        </Link>
      </div>
    </div>
  );
}
