import "./home.css";
import "aos/dist/aos.css";
import Aos from "aos";
import React, { useEffect } from "react";
import IntroduceTop from "../../components/main/introducetop/IntroduceTop";
import Info from "../../components/main/info/Info";
import {
  infoDataOne,
  infoDataTwo,
  infoDataThree,
  infoDataFour,
} from "../../components/main/info/infoData";
import Introduce from "../../components/main/introduce/Introduce";
import { introduceData } from "../../components/main/introduce/introduceData";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import Comment from "../../components/main/comment/Comment";
import ProductNoneAPI from "../../components/products/ProductNoneAPI";
import { productsData } from "../../data";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="home">
      <IntroduceTop />
      <div className="home-section">
        <div className="home__row">
          <BrandBar />

          <div id="categories" className="row">
            <Info {...infoDataOne} />
            <Info {...infoDataTwo} />
          </div>
          <div data-aos="fade-up" className="row">
            <ProductNoneAPI id={0} data={productsData} />
            <ProductNoneAPI id={3} data={productsData} />
            <ProductNoneAPI id={4} data={productsData} />
            <ProductNoneAPI id={6} data={productsData} />
            <ProductNoneAPI id={6} data={productsData} />
          </div>
          <div className="row">
            <Info {...infoDataThree} />
            <Info {...infoDataFour} />
          </div>
          <div data-aos="fade-up" className="row">
            <ProductNoneAPI id={8} data={productsData} />
            <ProductNoneAPI id={9} data={productsData} />
            <ProductNoneAPI id={12} data={productsData} />
            <ProductNoneAPI id={14} data={productsData} />
            <ProductNoneAPI id={14} data={productsData} />
          </div>
          <Introduce data={introduceData} />
          <div data-aos="fade-up" id="blog" className="row">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
}
