import React, { useEffect } from "react";
import Info from "../info/Info";
import Product from "../products/Product";
import "./main.css";
import {
  infoDataOne,
  infoDataTwo,
  infoDataThree,
  infoDataFour,
} from "../info/infoData";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  productOne,
  productTwo,
  productThree,
  productFour,
  productFive,
  productSix,
  productSeven,
  productEight,
  productNine,
  productTen,
  productEleven,
  productTwelve,
} from "../products/productData";
import Introduce from "../introduce/Introduce";
import { introduceData } from "../introduce/introduceData";
import ImageSlider from "../slide/ImageSlider";
import { SliderData } from "../slide/SliderData";
import Comment from "../comment/Comment";

export default function Main() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-12">
          <ImageSlider slides={SliderData} />
          <div className="info" id="categories">
            <Info {...infoDataOne} />
            <Info {...infoDataTwo} />
          </div>
          <div>
            <div data-aos="fade-up" className="main__product">
              <Product {...productOne} />
              <Product {...productFour} />
              <Product {...productSix} />
              <Product {...productSeven} />
            </div>
            <div className="info">
              <Info {...infoDataThree} />
              <Info {...infoDataFour} />
            </div>
            <div data-aos="fade-up" className="main__product">
              <Product {...productNine} />
              <Product {...productTen} />
              <Product {...productEleven} />
              <Product {...productTwelve} />
            </div>
          </div>
          <div id="services">
            <Introduce data={introduceData} />
          </div>
          <div data-aos="fade-down" id="blog" className="main__comment">
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
}
