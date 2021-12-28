import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";

import LocationBar from "../../components/bar/locationbar/LocationBar";
import ReviewBar from "../../components/bar/reviewtextbar/ReviewBar";
import "./productdetails.css";

export default function ProductDetails({ data }) {
  // Them param id vao duong dan
  const { id } = useParams();
  // console.log(data[id-1])
  const array = [...data[id].attribute.image];

  const [current, setCurrent] = useState(0);

  //Axios get Data
  const location = useLocation();
  const path = location.pathname;
  console.log("new path: " + path);
  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get("http://localhost:5000/product");
      console.log(response.data);
    };
    getAll();
  }, []);

  return (
    <div className="product-details">
      <div className="product-details-section">
        <div className="product-details-row">
          <LocationBar />
          <div className="row">
            <div className="product-details-left-info">
              <div className="product-details-image">
                <div className="product-details-image__left">
                  {array.map((data, index) => {
                    return (
                      <>
                        <img
                          src={data}
                          alt="product color"
                          className="product-details-image__left-item"
                          onClick={() => setCurrent(index)}
                        />
                      </>
                    );
                  })}
                </div>
                <div className="product-details-image__right">
                  <img
                    id="demoLarge"
                    src={data[id].attribute.image[current]}
                    alt="product color"
                    className="product-details-image__right-item"
                  />
                </div>
              </div>
            </div>
            <div className="product-details-right-info">
              <h2 className="product-details-name">
                {data[id].attribute.name}
              </h2>
              <h3 className="product-details-price">
                {new Intl.NumberFormat().format(data[id].attribute.price)} VND
              </h3>
              <p className="product-details-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a
                doloribus iste natus et facere? dolor sit amet consectetur
                adipisicing elit. Sunt a doloribus iste natus et facere?
              </p>
              <div className="product-details-choose">
                <div className="product-details-choose__item">
                  <label for="memory">Memory:</label>
                  <select
                    className="product-details-choose__item-select"
                    name="memory"
                    id="memory"
                  >
                    <option value="128">128 GB</option>
                    <option value="256">256 GB</option>
                    <option value="512">512 GB</option>
                  </select>
                </div>
                <div className="product-details-choose__item">
                  <label for="color">Color:</label>
                  <select
                    className="product-details-choose__item-select"
                    name="color"
                    id="color"
                  >
                    <option value="white">White</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                    <option value="black">Black</option>
                  </select>
                </div>
              </div>
              <div className="product-details-quantity">
                <p className="product-details-text__bold">Quantity:</p>
                <input
                  type="text"
                  placeholder="1"
                  className="product-details-quantity-input"
                />
              </div>
              <p>
                <span className="product-details-text__bold">Brand:</span>{" "}
                {data[id].attribute.brand}
              </p>
              <p>
                <span className="product-details-text__bold">
                  Product type:
                </span>{" "}
                {data[id].attribute.type}
              </p>
              <p>
                <span className="product-details-text__bold">
                  Availability:
                </span>{" "}
                <span className="product-details-text__green">
                  In Stock {data[id].attribute.status} items
                </span>
              </p>
              <div className="product-details__btn">
                <button className="btn product-details__btn-item">
                  <Link to="/" className="link__btn">
                    Add to cart
                  </Link>
                </button>
                <button className="btn product-details__btn-item">
                  <Link to="/cart" className="link__btn">
                    Buy Now
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <ReviewBar />
          <div className="row">
            <div className="product-details-posts">
              <p>
                For the time of the ugly at the fear of the thermal real estate
                no deumantos solicited the cat. Pellentesque diam pain, the
                element etos des soft as laughter.
              </p>
              <p className="product-details-text__bold">
                Sample Unordered List
              </p>
              <p>
                Comodous in time for the bears Pellentesque vitae nec mollis
                urna mattis laoreet. Divamus sit amet purus justo. Then the
                ordeal takes the pain and the pain is put to the loremous Sample
                Ordered List Comodous in time for bears Pellentesque vitae nec
                mollis urna mattis laoreet. Divamus sit amet purus justo. Then
                the ordeal takes the pain and the pain is put to the loremous{" "}
              </p>
              <p className="product-details-text__bold">
                Sample Paragraph Text{" "}
              </p>
              <p>
                At the entrance of the earth, at our customers. The pressure of
                life is always a lot, it is a nice valley. We give it to the
                bears. But from my life, from my survey and the price of the
                game. Pellentesque nulla eros accumsan quis justo at tincidunt
                lobortis denimes loremous. The bed of the weekend hangs in the
                bed, so that the dishes are pure cushion. The author is very
                important.
              </p>
            </div>
            <div className="product-details-specifications">
              <p
                className="product-details-text__bold"
                style={{
                  textAlign: "center",
                  color: "#eb0028",
                  fontSize: "1.4rem",
                  fontFamily: "monospace",
                  textDecoration: "underline",
                }}
              >
                Specifications
              </p>
              <div className="product-details-specifications-image">
                <img
                  src={data[id].attribute.image[0]}
                  alt="Product Details"
                  className="product-details-specifications-image__img"
                />
              </div>
              <p>
                <span className="product-details-text__bold">
                  Screen technology:
                </span>
                {data[id].details.specifications.screen}
              </p>
              <p>
                <span className="product-details-text__bold">
                  Operating System:
                </span>
                {data[id].details.specifications.OperatingSystem}
              </p>
              <p>
                <span className="product-details-text__bold">
                  Processor Chip (CPU):
                </span>
                {data[id].details.specifications.CPU}
              </p>
              <p>
                <span className="product-details-text__bold">ROM:</span>
                {data[id].details.specifications.ROM}
              </p>
              <p>
                <span className="product-details-text__bold">RAM:</span>
                {data[id].details.specifications.RAM}
              </p>
              <p>
                <span className="product-details-text__bold">
                  Mobile network:
                </span>
                {data[id].details.specifications.NetworkSupport}
              </p>
              <p>
                <span className="product-details-text__bold">
                  Number of sim slots:
                </span>
                {data[id].details.specifications.SIM}
              </p>
              <p>
                <span className="product-details-text__bold">Weight:</span>
                {data[id].details.specifications.weight}
              </p>
              <p>
                <span className="product-details-text__bold">
                  Battery capacity:
                </span>
                {data[id].details.specifications.battery}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
