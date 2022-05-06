import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableProductMUISimple() {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <form className="nav-bar__form">
          <input
            type="text"
            className="nav-bar__form-input-admin"
            placeholder="Tìm kiếm"
            name="search"
            onChange={(e) => setTagName(e.target.value)}
          />
        </form>

        <TableHead>
          <TableCell style={{ textAlign: "center" }}>STT</TableCell>
          <TableCell style={{ textAlign: "center" }}>MÃ SP</TableCell>
          <TableCell style={{ textAlign: "center" }}>TÊN SẢN PHẨM</TableCell>
          <TableCell style={{ textAlign: "center" }}>HÌNH ẢNH</TableCell>
          <TableCell style={{ textAlign: "center" }}>SỐ LƯỢNG</TableCell>
          <TableCell style={{ textAlign: "center" }}>GIÁ NHẬP HÀNG</TableCell>
          <TableCell style={{ textAlign: "center" }}>GIÁ BÁN</TableCell>
        </TableHead>

        <TableBody>
          {searchData.map((data, index) => {
            var i = index;
            return (
              <TableRow
                key={data.MSHH}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ textAlign: "center" }}>{(index += 1)}</TableCell>
                <TableCell>{data.MSHH}</TableCell>
                <TableCell>{data.TenHH}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <img
                    src={imageMain[i][0]}
                    alt="product"
                    className="table__image"
                  />
                </TableCell>
                <TableCell style={{ textAlign: "center", fontWeight: "700" }}>
                  {data.SoLuongHang}
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  {new Intl.NumberFormat().format(data.GiaNhapHang)} VND
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>
                  {new Intl.NumberFormat().format(data.Gia)} VND
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableProductMUISimple;
