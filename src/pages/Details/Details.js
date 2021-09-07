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
import RangeBar from "../../components/rangebar/RangeBar";
import LocationBar from "../../components/locationbar/LocationBar";
import "./details.css";
import BrandBar from "../../components/brandbar/BrandBar";
export default function Details() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="details">
      <div className="container">
        <div className="details__row">
        <LocationBar />
        <BrandBar/>
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
        </div>
      </div>
    </div>
  );
}
