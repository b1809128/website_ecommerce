import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./details.css";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct"
import { slideProductData } from "../../components/main/slideproduct/slideProductData";

export default function Details({data}) {
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
