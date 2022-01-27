import "../Details/details.css";
import "aos/dist/aos.css";
import Aos from "aos";
import React, { useEffect, useState } from "react";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct";
import ProductAPI from "../../components/products/ProductAPI";
import { useLocation } from "react-router-dom";
export default function Details() {
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 2000,
    });
  }, []);
  //Query Parameters
  const query = new URLSearchParams(useLocation().search);
  const sortBy = query.get("sortBy");
  const localStorageData = JSON.parse(localStorage.getItem("tagName"));
  //Fetch API
  const [product, setProduct] = useState(localStorageData);
  if (!localStorageData) setProduct([]);

  return (
    <div className="details">
      <div className="details-section">
        <div className="details__row">
          <LocationBar />
          <BrandBar />
          <RangeBar data={sortBy} />
          <div className="row">
            <ProductAPI data={product} />
          </div>
          <SlideProduct />
        </div>
      </div>
    </div>
  );
}
