/* eslint-disable jsx-a11y/alt-text */
import "./info.css";
import { Link } from "react-router-dom";

export default function Info({ heading, name, image, action }) {
  return (
    <div className="info__wrapper">
      <div className="info__image">
        <img className="info__image-img" src={image} />
      </div>
      <div className="info__text">
        <h4 className="info__text-heading">{heading}</h4>
        <h2 className="info__text-name">{name}</h2>
        <button className="btn btn-slide">
          <Link
            className="link__btn"
            to={{
              pathname: "/tat-ca-san-pham",
              search: `?search=${action}`,
            }}
          >
            XEM CHI TIẾT
          </Link>
        </button>
      </div>
    </div>
  );
}
