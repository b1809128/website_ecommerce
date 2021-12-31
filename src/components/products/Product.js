import './product.css';
import {FaBookmark, FaCartPlus,FaPen} from 'react-icons/fa';
import {Link} from "react-router-dom";

export default function Product({
    image,
    name,
    price
}){
    return (
        <div className="product">
            <div className="product-image">
                <img src={image} className="product-image__img" alt={name}/>
                <div className="product-image__modal">
                    <ul className="product-image__modal-list">
                        <li className="product-image__modal-list-item link"><FaBookmark/></li>
                        <li className="product-image__modal-list-item link"><FaCartPlus/></li>
                        <li className="product-image__modal-list-item link"><FaPen/></li>
                    </ul>
                </div>
            </div>
            <p className="product-name link">{name}</p>
            <p className="product-price">{new Intl.NumberFormat().format(price)}VND</p>
            <button className="btn"><Link to="/product-details" className="link__btn">Buy Now</Link></button>
        </div>
    );
}