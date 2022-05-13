import "./brandbar.css";
import "./tagsbar.css";
import React, { useEffect, useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
export default function BrandBar() {
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios.get("http://localhost:5000/product/categories");
      setBrand(res.data);
    };
    fetchAPI();
  }, []);
  return (
    <div className="tags-bar">
      <ul className="brand-bar-list">
        {brand.map((data) => (
          <li className="tag__bar-item">
            <Link
              // to=`/tat-ca-san-pham?brand=${data.MaLoaiHang}`
              to={{
                pathname: "/tat-ca-san-pham",
                search: `?brand=${data.MaLoaiHang}`,
              }}
              className="link"
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <FaMobileAlt className="tag__bar-icon" /> {data.TenLoaiHang}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
