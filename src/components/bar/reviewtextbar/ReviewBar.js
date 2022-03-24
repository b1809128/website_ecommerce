import "./review.css";
import { FaRegBookmark } from "react-icons/fa";
export default function ReviewBar() {
  return (
    <div className="review-bar">
      <ul className="review-bar-list">
        <li className="review-bar-item link">
          <FaRegBookmark /> Mô tả
        </li>
        <li className="review-bar-item link">
          <FaRegBookmark />
          Đánh giá
        </li>
        <li className="review-bar-item link">
          <FaRegBookmark />
          Chi tiết giao hàng
        </li>
      </ul>
    </div>
  );
}
