import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import ReviewBar from "../../components/bar/reviewtextbar/ReviewBar";
import "./productdetails.css";
import SimilarProduct from "../../components/SimilarProduct/SimilarProduct";

export default function ProductDetailsAPI({ addCart }) {
  // Them param id vao duong dan
  const { id } = useParams();

  //Axios get Data
  const [product, setProduct] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getAll = async () => {
      const response = await axios.get(
        "http://localhost:5000/product/details/" + id
      );
      setProduct(response.data);
    };
    getAll();
  }, [id]);

  const pathImages = product.map((data) => {
    return JSON.parse(data.PATH);
  });

  //Onclick Events
  const [click, setClick] = useState(0);

  return (
    <>
      {product.map((data) => {
        return (
          <div className="product-details">
            <div className="product-details-section">
              <div className="product-details-row">
                <LocationBar nameProduct={data.TenHH}/>
                <div className="row">
                  <div className="product-details-left-info">
                    <div className="product-details-image">
                      <div className="product-details-image__left">
                        {/* Image Array here */}
                        {pathImages[0].map((data, index) => {
                          return (
                            <>
                              <img
                                src={data}
                                alt="product color"
                                className="product-details-image__left-item"
                                onClick={() => setClick(index)}
                                index={index}
                              />
                            </>
                          );
                        })}
                      </div>
                      <div className="product-details-image__right">
                        <img
                          id="demoLarge"
                          src={JSON.parse(data.PATH)[click]}
                          alt="product color"
                          className="product-details-image__right-item"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="product-details-right-info">
                    <h2 className="product-details-name">{data.TenHH}</h2>
                    <h3 className="product-details-price">
                      {new Intl.NumberFormat().format(data.Gia)} VND
                    </h3>
                    <p className="product-details-description">
                      {JSON.parse(data.MoTa).Description}
                    </p>
                    <div className="product-details-choose">
                      <div className="product-details-choose__item">
                        <label for="memory">
                          <span
                            className="product-details-text__bold"
                            style={{ fontSize: "1rem" }}
                          >
                            Bộ nhớ:
                          </span>
                        </label>
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
                        <label for="color">
                          <span
                            className="product-details-text__bold"
                            style={{ fontSize: "1rem" }}
                          >
                            Màu sắc:
                          </span>
                        </label>
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
                      <p className="product-details-text__bold">Số Lượng:</p>
                      <input
                        type="text"
                        placeholder="1"
                        className="product-details-quantity-input"
                      />
                    </div>
                    <p>
                      <span className="product-details-text__bold">
                        Thương Hiệu:
                      </span>{" "}
                      {JSON.parse(data.MoTa).Brand}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Loại Sản Phẩm:
                      </span>{" "}
                      {JSON.parse(data.MoTa).Type}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Có Sẵn:
                      </span>{" "}
                      {data.SoLuongHang > 0 ? (
                        <span className="product-details-text__green">
                          {data.SoLuongHang} sản phẩm
                        </span>
                      ) : (
                        <span className="product-details-text__green">
                          Hết Hàng
                        </span>
                      )}
                    </p>
                    <div className="product-details__btn">
                      <button
                        className="btn product-details__btn-item"
                        onClick={() => addCart(id)}
                      >
                        THÊM VÀO GIỎ
                      </button>
                      <button className="btn product-details__btn-item">
                        <Link to="/gio-hang" className="link__btn">
                          MUA NGAY
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
                <ReviewBar />
                <div className="row">
                  <div className="product-details-posts">
                    <p>
                      For the time of the ugly at the fear of the thermal real
                      estate no deumantos solicited the cat. Pellentesque diam
                      pain, the element etos des soft as laughter.
                    </p>
                    <p className="product-details-text__bold">
                      Sample Unordered List
                    </p>
                    <p>
                      Comodous in time for the bears Pellentesque vitae nec
                      mollis urna mattis laoreet. Divamus sit amet purus justo.
                      Then the ordeal takes the pain and the pain is put to the
                      loremous Sample Ordered List Comodous in time for bears
                      Pellentesque vitae nec mollis urna mattis laoreet. Divamus
                      sit amet purus justo. Then the ordeal takes the pain and
                      the pain is put to the loremous{" "}
                    </p>
                    <p className="product-details-text__bold">
                      Sample Paragraph Text{" "}
                    </p>
                    <p>
                      At the entrance of the earth, at our customers. The
                      pressure of life is always a lot, it is a nice valley. We
                      give it to the bears. But from my life, from my survey and
                      the price of the game. Pellentesque nulla eros accumsan
                      quis justo at tincidunt lobortis denimes loremous. The bed
                      of the weekend hangs in the bed, so that the dishes are
                      pure cushion. The author is very important.
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
                      Cấu hình chi tiết
                    </p>
                    <div className="product-details-specifications-image">
                      <img
                        src={JSON.parse(data.PATH)[0]}
                        alt="Product Details"
                        className="product-details-specifications-image__img"
                      />
                    </div>
                    <p>
                      <span className="product-details-text__bold">
                        Công nghệ màn hình:
                      </span>
                      {JSON.parse(data.MoTa).Screen}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Hệ điều hành:
                      </span>
                      {JSON.parse(data.MoTa).OS}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Chip Xử lý (CPU):
                      </span>
                      {JSON.parse(data.MoTa).CPU}
                    </p>
                    <p>
                      <span className="product-details-text__bold">ROM:</span>
                      {JSON.parse(data.MoTa).ROM}
                    </p>
                    <p>
                      <span className="product-details-text__bold">RAM:</span>
                      {JSON.parse(data.MoTa).RAM}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Mạng di động:
                      </span>
                      {JSON.parse(data.MoTa).Network}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Số sim khả dụng:
                      </span>
                      {JSON.parse(data.MoTa).SIM}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Cân nặng:
                      </span>
                      {JSON.parse(data.MoTa).Weight}
                    </p>
                    <p>
                      <span className="product-details-text__bold">
                        Dung lượng pin:
                      </span>
                      {JSON.parse(data.MoTa).Battery}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="product-details-section">
        <SimilarProduct groupBy={product.map((data) => data.MaLoaiHang)} />
      </div>
    </>
  );
}
