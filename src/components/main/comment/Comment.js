/* eslint-disable jsx-a11y/alt-text */
import { FaLongArrowAltRight, FaStar, FaStarHalf } from 'react-icons/fa';
import './comment.css';

export default function Comment(){
    return (
        <div className="comment">
            <div className="comment-image">
                <img src="./images/logo_apple.jpg" className="comment-image__img"/>                
            </div>
            <p className="comment-text">This is a best shop technology with lot of service for customer</p>
            <p className="comment-star">
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStarHalf/>
            </p>
            <div className="comment-link"><FaLongArrowAltRight/> <span className="comment-link__text">Read more</span></div>
        </div>
    );
}