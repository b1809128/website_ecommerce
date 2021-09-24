import "./product.css";
import { FaBookmark, FaCartPlus, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductNoneAPI({ data, id }) {
  if (id!=="") {
    return (
      <>
        <div className="product">
          <div className="product-image">
            <img
              src={data[id].attribute.image}
              className="product-image__img"
            />
            <div className="product-image__modal">
              <ul className="product-image__modal-list">
                <li className="product-image__modal-list-item link">
                  <FaBookmark />
                </li>
                <li className="product-image__modal-list-item link">
                  <FaCartPlus />
                </li>
                <li className="product-image__modal-list-item link">
                  <FaPen />
                </li>
              </ul>
            </div>
          </div>
          <p className="product-name link">{data[id].attribute.name}</p>
          <p className="product-price">{data[id].attribute.price}</p>
          <button className="btn">
            <Link to="/product-details" className="link__btn">
              Buy Now
            </Link>
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {data.map((data) => (
          <div className="product">
            <div className="product-image">
              <img src={data.attribute.image} className="product-image__img" />
              <div className="product-image__modal">
                <ul className="product-image__modal-list">
                  <li className="product-image__modal-list-item link">
                    <FaBookmark />
                  </li>
                  <li className="product-image__modal-list-item link">
                    <FaCartPlus />
                  </li>
                  <li className="product-image__modal-list-item link">
                    <FaPen />
                  </li>
                </ul>
              </div>
            </div>
            <p className="product-name link">{data.attribute.name}</p>
            <p className="product-price">{data.attribute.price}</p>
            <button className="btn">
              <Link to="/product-details" className="link__btn">
                Buy Now
              </Link>
            </button>
          </div>
        ))}
      </>
    );
  }
}
