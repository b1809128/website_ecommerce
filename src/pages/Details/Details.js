import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./details.css";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct";
import ProductAPI from "../../components/products/ProductAPI";

import axios from "axios";
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
  const brandID = query.get("brand");
  //Fetch API
  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const allProducts = await axios.get(
        `http://localhost:5000/product/all?sortBy=${sortBy}`
      );
      const brandFilter = await axios.get(
        `http://localhost:5000/product/group/${brandID}`
      );
      setProduct(allProducts.data);
      setBrand(brandFilter.data);
    };
    fetch();
  }, [brandID, sortBy]);

  var flag = false;
  if (brandID) {
    flag = true;
  }
  // console.log(flag)

  return (
    <div className="details">
      <div className="details-section">
        <div className="details__row">
          <LocationBar />
          <BrandBar />
          <RangeBar data={sortBy} />
          {/* <div className="row">
            <ProductNoneAPI id={""} data={productsData} />
          </div> */}
          <div className="row">
            <ProductAPI data={flag ? brand : product} />
          </div>
          <SlideProduct />
        </div>
      </div>
    </div>
  );
}
