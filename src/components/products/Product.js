import './product.css';
import {FaBookmark, FaCartPlus,FaPen} from 'react-icons/fa'

export default function Product({
    image,
    name,
    price
}){
    return (
        <div className="product col l-2-4 m-6 c-12">
            <div className="product-image">
                <img src={image} className="product-image__img"/>
                <div className="product-image__modal">
                    <ul className="product-image__modal-list">
                        <li className="product-image__modal-list-item link"><FaBookmark/></li>
                        <li className="product-image__modal-list-item link"><FaCartPlus/></li>
                        <li className="product-image__modal-list-item link"><FaPen/></li>
                    </ul>
                </div>
            </div>
            <p className="product-name link">{name}</p>
            <p className="product-price">{price}</p>
            <button className="btn">Buy Now</button>
        </div>
    );
}