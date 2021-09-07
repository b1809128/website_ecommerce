import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./slideproduct.css";
import { slideProductData } from "./slideProductData";

export default function SlideProduct() {
  const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
  };
  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        {slideProductData.map((data, index)=>{
          return <div key={index} className="test">{data.case}</div>;
        })}
      </Slider>
    </div>
  );
}
