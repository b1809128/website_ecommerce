import "./table.css";
import "../header/header.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function TableProduct() {
  //Search
  const [tagName, setTagName] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const searchProduct = async () => {
      try {
        if (tagName) {
          const res = await axios.get(
            `http://localhost:5000/manage/table/product/search?q=${tagName}`
          );
          setSearchData(res.data);
        } else {
          const res = await axios.get(
            `http://localhost:5000/manage/table/product/search`
          );
          setSearchData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchProduct();
  }, [tagName]);

  //Map image in array choose image[0]
  const imageMain = searchData.map((data) => JSON.parse(data.PATH));

  return (
    <>
      <form className="nav-bar__form">
        <input
          type="text"
          className="nav-bar__form-input-admin"
          placeholder="Tìm kiếm"
          name="search"
          onChange={(e) => setTagName(e.target.value)}
        />
      </form>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>STT</th>
            <th style={{ textAlign: "center" }}>MÃ SP</th>
            <th style={{ textAlign: "center" }}>TÊN SẢN PHẨM</th>
            <th style={{ textAlign: "center" }}>HÌNH ẢNH</th>
            <th style={{ textAlign: "center" }}>SỐ LƯỢNG</th>
            <th style={{ textAlign: "center" }}>GIÁ (VND)</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((data, index) => {
            var i = index;
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>{(index += 1)}</td>
                  <td>{data.MSHH}</td>
                  <td>{data.TenHH}</td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={imageMain[i][0]}
                      alt="product"
                      className="table__image"
                    />
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "700" }}>
                    {data.SoLuongHang}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {new Intl.NumberFormat().format(data.Gia)}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableProduct;
