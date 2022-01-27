/* eslint-disable jsx-a11y/alt-text */
import { FaLongArrowAltRight, FaStar, FaStarHalf } from "react-icons/fa";
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
        This is a best shop technology with lot of service for customer
      </p>
      <p className="comment-star">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalf />
      </p>
      <div className="comment-link">
        <FaLongArrowAltRight />{" "}
        <span className="comment-link__text">Read more</span>
      </div>
    </div>
  );
}
