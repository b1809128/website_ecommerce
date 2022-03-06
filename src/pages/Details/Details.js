import "./details.css";
import "aos/dist/aos.css";
import Aos from "aos";
import React, { useEffect, useState } from "react";
import RangeBar from "../../components/bar/rangebar/RangeBar";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import BrandBar from "../../components/bar/brandbar/BrandBar";
import SlideProduct from "../../components/main/slideproduct/SlideProduct";
import ProductAPI from "../../components/products/ProductAPI";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/bar/pagination/Pagination";
//Import API Dynamic
/* import ProductNoneAPI from "../../components/products/ProductNoneAPI";
 import { productsData } from "../../data";
*/
export default function Details() {
  //Query Parameters url?abc=1
  const query = new URLSearchParams(useLocation().search);
  const sortBy = query.get("sortBy");
  const brandID = query.get("brand");
  const searchQuery = query.get("search");
  const pageQuery = query.get("page");
  //Fetch API
  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [numberPage, setNumberPage] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 2000,
    });

    //fetchAPI
    const fetchAPI = async () => {
      const allProducts = await axios.get(
        `http://localhost:5000/product/all?sortBy=${sortBy}`
      );

      setNumberPage(Math.ceil(allProducts.data.length / 15));

      const brandFilter = await axios.get(
        `http://localhost:5000/product/group/${brandID}`
      );
      if (pageQuery) {
        const paginationAfter = allProducts.data.filter((data, idx) => {
          return idx > 14;
        });
        setProduct(paginationAfter);
      } else {
        const paginationBefore = allProducts.data.filter((data, idx) => {
          return idx < 15;
        });
        setProduct(paginationBefore);
      }
      setBrand(brandFilter.data);
    };

    //searchAPI
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
    fetchAPI();
  }, [brandID, pageQuery, searchQuery, sortBy]);

  //Check Exist to show details by query Brand ID
  var flag = false;
  if (brandID) {
    flag = true;
  }

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
            <ProductAPI
              data={searchQuery ? searchData : flag ? brand : product}
            />
          </div>
          <div className="row">
            <Pagination props={numberPage} />
          </div>
          <SlideProduct />
        </div>
      </div>
    </div>
  );
}
