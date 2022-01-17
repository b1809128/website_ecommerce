import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Details/details.css";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct";
import ProductAPI from "../../components/products/ProductAPI";
import { useLocation } from "react-router-dom";
//Import API Dynamic
/* import ProductNoneAPI from "../../components/products/ProductNoneAPI";
 import { productsData } from "../../data";
*/
export default function Details() {
  useEffect(() => {
    window.scrollTo(0,0)
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
  if(!localStorageData) setProduct([])

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
