import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./details.css";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct"
import { slideProductData } from "../../components/main/slideproduct/slideProductData";
import { productsData } from "../../data";

export default function Details() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  productsData.map((data, index)=>{
    console.log(data.attribute);
  })
  
  return (
    <div className="details">
      <div className="details-section">
        <div className="details__row">
          <LocationBar />
          <BrandBar />
          <RangeBar />
          <div className="row">
            {slideProductData.map(data => {
              return data.case;
            })}            
          </div>
          <SlideProduct/>
          
          {/* <ImageSlider slides={SliderData} /> */}
        </div>
      </div>
    </div>
  );
}
