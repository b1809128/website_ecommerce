import "./product.css";
import { FaBookmark, FaCartPlus, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductAPI({ data }) {
  // console.log(data);
  // console.log(data.map(db=>{return db.MSHH}))
  const test = data.map((db) => {
    return JSON.parse(db.PATH);
  });
  // console.log(test[0][0]);
  return (
    <>
      {data.map((data, index) => (
        <div className="product">
          <div className="product-image">
            <img
              alt="productimage"
              src={test[index][0]}
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
          <p className="product-name link">{data.TenHH}</p>
          <p className="product-price">{new Intl.NumberFormat().format(data.Gia)} VND</p>
          <button className="btn">
            <Link
              to={"/product-details-api/" + data.MSHH}
              className="link__btn"
            >
              Buy Now
            </Link>
          </button>
        </div>
      ))}
    </>
  );
}
