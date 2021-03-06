import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "./slideproduct.css";
import ProductAPI from "../../products/ProductAPI";
import { FaAngleRight } from "react-icons/fa";
export default function SlideProductAPI({ title, groupBy }) {
  //Slick-Carousel Settings to slide Product Components
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/product/all`);
        setProductData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //Call function API
    fetchAPI();
  }, []);

  return (
    <div className="slide-product">
      <h2 className="title__tag">
        <FaAngleRight />
        {title}
      </h2>
      <Slider {...settings}>
        {productData.map((data, index) => {
          return <div key={index}>{<ProductAPI data={data} />}</div>;
        })}
      </Slider>
    </div>
  );
}
