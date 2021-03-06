import "./product.css";
import { Link } from "react-router-dom";
import ModalProduct from "../modal/ModalProduct";

export default function ProductAPI({ data, addCart }) {
  //Map image data in PATH array choose image[0]
  const imageMain = data.map((db) => {
    return JSON.parse(db.PATH);
  });

  return (
    <>
      {data.map((data, index) => (
        <div className="product">
          <div className="product-image">
            <img
              alt="productimage"
              src={imageMain[index][0]}
              className="product-image__img"
            />
            <ModalProduct addCart={addCart} id={data.MSHH} />
          </div>
          <Link
            to={"/chi-tiet-san-pham/" + data.MSHH}
            title={data.TenHH}
            className="product-name link"
          >
            {data.TenHH}
          </Link>
          <p className="product-price">
            {new Intl.NumberFormat().format(data.Gia)} VND
          </p>
          <button className="btn">
            <Link to={"/chi-tiet-san-pham/" + data.MSHH} className="link__btn">
              MUA NGAY
            </Link>
          </button>
        </div>
      ))}
    </>
  );
}
