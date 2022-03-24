import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductAPI from "../products/ProductAPI";
export default function SimilarProduct({ groupBy }) {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/product/group/${groupBy}`);
        setProductData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //Call function API
    fetchAPI();
  }, [groupBy]);

  return (
    <div style={{ display: "block", width: "100%" }}>
      <h2
        style={{
          color: "#eb0028",
          fontFamily: "monospace",
          textDecoration: "underline",
        }}
      >
        Sản phẩm tương tự:
      </h2>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}
      >
        <ProductAPI data={productData} />
      </div>
    </div>
  );
}
