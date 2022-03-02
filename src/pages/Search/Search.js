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
import axios from "axios";
export default function Details() {
  //Query Parameters
  const query = new URLSearchParams(useLocation().search);
  const sortBy = query.get("sortBy");

  //Search
  const searchQuery = query.get("search");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 2000,
    });

    const searchAPI = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/manage/table/product/search?q=${searchQuery}`
        );
        setSearchData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    //Call function
    searchAPI();
  }, [searchQuery]);

  return (
    <div className="details">
      <div className="details-section">
        <div className="details__row">
          <LocationBar />
          <BrandBar />
          <RangeBar data={sortBy} />
          <div className="row">
            <ProductAPI data={searchData} />
          </div>
          <SlideProduct />
        </div>
      </div>
    </div>
  );
}
