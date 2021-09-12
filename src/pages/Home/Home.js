import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import "./home.css";
import IntroduceTop from "../../components/main/introducetop/IntroduceTop";
import Info from "../../components/main/info/Info";
import Product from "../../components/products/Product";
import { infoDataOne, infoDataTwo, infoDataThree, infoDataFour } from "../../components/main/info/infoData";
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
import Introduce from "../../components/main/introduce/Introduce";
import { introduceData } from "../../components/main/introduce/introduceData";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import Comment from "../../components/main/comment/Comment";

export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="home">
      <div className="home-section">
        <div className="home__row">
          <IntroduceTop />
          <div id="categories">
            <BrandBar />
          </div>
          <div className="row">
            <Info {...infoDataOne} />
            <Info {...infoDataTwo} />
          </div>
          <div data-aos="fade-up" className="row">
            <Product {...productOne} />
            <Product {...productFour} />
            <Product {...productSix} />
            <Product {...productSeven} />
          </div>
          <div className="row">
            <Info {...infoDataThree} />
            <Info {...infoDataFour} />
          </div>
          <div data-aos="fade-up" className="row">
            <Product {...productNine} />
            <Product {...productTen} />
            <Product {...productEleven} />
            <Product {...productTwelve} />
          </div>
          <Introduce data={introduceData} />
          <div data-aos="fade-up" id="blog" className="row">
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
}
