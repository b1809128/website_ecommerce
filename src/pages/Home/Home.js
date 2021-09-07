import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import "./home.css";
import Info from "../../components/info/Info";
import Product from "../../components/products/Product";
import {
  infoDataOne,
  infoDataTwo,
} from "../../components/info/infoData";
import {
  productOne,
  productFour,
  productSix,
  productSeven,
  productNine,
  productTen,
  productEleven,
  productTwelve,
} from "../../components/products/productData";
import Introduce from "../../components/introduce/Introduce";
import { introduceData } from "../../components/introduce/introduceData";
import ImageSlider from "../../components/slide/ImageSlider";
import { SliderData } from "../../components/slide/SliderData";
import Comment from "../../components/comment/Comment";

export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="home">
      <div className="container">
        <div className="home__row">
          <ImageSlider slides={SliderData} />

          <div id="categories" className="row">
            <Info {...infoDataOne} />
            <Info {...infoDataTwo} />
          </div>

          <div data-aos="fade-down" className="row">
            <Product {...productOne} />
            <Product {...productFour} />
            <Product {...productSix} />
            <Product {...productSeven} />
          </div>
          <div className="row">
            <Info {...infoDataOne} />
            <Info {...infoDataTwo} />
          </div>

          <div data-aos="fade-down" className="row">
            <Product {...productNine} />
            <Product {...productTen} />
            <Product {...productEleven} />
            <Product {...productTwelve} />
          </div>
          
          <Introduce data={introduceData} />
          <div data-aos="fade-down" id="blog" className="row">
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
}
