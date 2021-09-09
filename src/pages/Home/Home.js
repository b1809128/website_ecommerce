import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import "./home.css";
import IntroduceTop from "../../components/introducetop/IntroduceTop"
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

import Comment from "../../components/comment/Comment";

export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);
  return (
    <div className="home">
      <div className="home-section">
        <div className="home__row">
          <IntroduceTop/>
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
          <div id="categories" className="row">
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
