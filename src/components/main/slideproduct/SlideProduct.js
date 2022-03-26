import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slideproduct.css";
import { slideProductData } from "./slideProductData";
import { FaAngleRight } from "react-icons/fa";

export default function SlideProduct({ title, groupBy }) {
  //Slick-Carousel Settings to slide Product Components
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slide-product">
      <h2 className="title__tag">
        <FaAngleRight />
        {title}
      </h2>
      <Slider {...settings}>
        {slideProductData.map((data, index) => {
          return <div key={index}>{data.case}</div>;
        })}
      </Slider>
    </div>
  );
}
