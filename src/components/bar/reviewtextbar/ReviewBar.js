import "./review.css";
import {FaRegBookmark} from "react-icons/fa";
export default function ReviewBar(){
    return(
        <div className="review-bar">
            <ul className="review-bar-list">
                <li className="review-bar-item link"><FaRegBookmark/> Description</li>
                <li className="review-bar-item link"><FaRegBookmark/>Reviews</li>
                <li className="review-bar-item link"><FaRegBookmark/>Shipping Details</li>
            </ul>
        </div>
    );
}