import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Product from "../../components/products/Product";
import {
  productOne,
  productFour,
  productSix,
  productSeven,
} from "../../components/products/productData";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./details.css";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import ImageSlider from "../../components/main/slide/ImageSlider";
import { SliderData } from "../../components/main/slide/SliderData";
import SlideProduct from "../../components/main/slideproduct/SlideProduct"

export default function Details() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="details">
      <div className="details-section">
        <div className="details__row">
          <LocationBar />
          <BrandBar />
          <RangeBar />
          <div className="row">
            <Product {...productOne} />
            <Product {...productFour} />
            <Product {...productSix} />
            <Product {...productSeven} />
          </div>
          <div className="row">
            <Product {...productOne} />
            <Product {...productFour} />
            <Product {...productSix} />
            <Product {...productSeven} />
          </div>
          <div className="row">
            <Product {...productOne} />
            <Product {...productFour} />
            <Product {...productSix} />
            <Product {...productSeven} />
          </div>
          {/* <ImageSlider slides={SliderData} /> */}
          <SlideProduct/>
        </div>
      </div>
    </div>
  );
}
