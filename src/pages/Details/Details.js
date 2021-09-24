import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./details.css";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct"
import ProductNoneAPI from "../../components/products/ProductNoneAPI";
import { productsData } from "../../data";

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
            <ProductNoneAPI id={""} data={productsData}/>
          </div>
          <SlideProduct/>
          
        </div>
      </div>
    </div>
  );
}
