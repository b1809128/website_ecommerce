import "../AllProducts/allProducts.css";
import "../Cart/cart.css";
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
export default function Search({ addCart }) {
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
          <LocationBar nameProduct={searchQuery ? searchQuery : ""} />
          <BrandBar />
          <RangeBar data={sortBy} />
          {searchData.length > 0 ? (
            <div className="row">
              <ProductAPI data={searchData} addCart={addCart} />
            </div>
          ) : (
            <div className="row">
              <div className="cart-empty-wrapper">
                <h2 className="cart-empty">
                  {" "}
                  {"< KHÔNG TÌM THẤY SẢN PHẨM NÀO ! >"}{" "}
                </h2>
              </div>
            </div>
          )}
          <SlideProduct text="CÓ THỂ BẠN SẼ THÍCH" />
        </div>
      </div>
    </div>
  );
}
