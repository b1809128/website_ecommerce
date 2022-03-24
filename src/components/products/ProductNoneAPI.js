import "./product.css";
import { Link } from "react-router-dom";
import ModalProduct from "../modal/ModalProduct";

export default function ProductNoneAPI({ data, id ,addCart}) {
  if (id !== "") {
    return (
      <>
        <div className="product">
          <div className="product-image">
            <img
              alt="productimage"
              src={data[id].attribute.image[0]}
              className="product-image__img"
            />
            <ModalProduct addCart={addCart} id={id} />
          </div>
          <p className="product-name link">{data[id].attribute.name}</p>
          <p className="product-price">
            {new Intl.NumberFormat().format(data[id].attribute.price)} VND
          </p>
          <button className="btn">
            <Link to={"/chi-tiet-san-pham-1/" + id} className="link__btn">
              Mua Ngay
            </Link>
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {data.map((data, index) => (
          <div className="product">
            <div className="product-image">
              <img
                alt="productimage"
                src={data.attribute.image[0]}
                className="product-image__img"
              />
              <ModalProduct />
            </div>
            <p className="product-name link">{data.attribute.name}</p>
            <p className="product-price">
              {new Intl.NumberFormat().format(data.attribute.price)} VND
            </p>
            <button className="btn">
              <Link to={"/product-details/" + index} className="link__btn">
                Buy Now
              </Link>
            </button>
          </div>
        ))}
      </>
    );
  }
}
