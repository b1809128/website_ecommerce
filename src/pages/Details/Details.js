import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./details.css";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct";
import ProductNoneAPI from "../../components/products/ProductNoneAPI";
import ProductAPI from "../../components/products/ProductAPI";

import { productsData } from "../../data";
import axios from "axios";

export default function Details() {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  //Fetch API
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get("http://localhost:5000/product/");
      setProduct(response.data);
    };
    getAll();
  }, []);
  return (
    <div className="details">
      <div className="details-section">
        <div className="details__row">
          <LocationBar />
          <BrandBar />
          <RangeBar />
          <div className="row">
            <ProductNoneAPI id={""} data={productsData} />
          </div>
          <div className="row">
            <ProductAPI data={product} />
          </div>
          <SlideProduct />
        </div>
      </div>
    </div>
  );
}
