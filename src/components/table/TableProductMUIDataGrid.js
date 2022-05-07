import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEdit } from "react-icons/fa";
const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "masp", headerName: "Mã sản phẩm", width: 100 },
  { field: "tensanpham", headerName: "Tên sản phẩm", width: 250 },
  {
    field: "hinhanh",
    headerName: "Hình ảnh",
    width: 200,
    renderCell: (params) => (
      <img src={params.value} alt="" height="150" width="150" />
    ),
  },
  {
    field: "soluongban",
    headerName: "Số lượng",
    type: "number",
    width: 80,
  },
  {
    field: "gianhaphang",
    headerName: "Giá nhập hàng",
    type: "number",
    width: 150,
  },
  {
    field: "giaban",
    headerName: "Giá bán",
    type: "number",
    width: 150,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 150,
  },
];
function TableProductMUIDataGrid({ showModal }) {
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
  var imageMain = searchData.map((data) => JSON.parse(data.PATH));

  var rows = [];

  for (let i = 0; i < searchData.length; i++) {
    rows[i] = {
      id: i,
      masp: searchData[i].MSHH,
      tensanpham: searchData[i].TenHH,
      hinhanh: imageMain[i][0],
      soluongban: searchData[i].SoLuongHang,
      gianhaphang: new Intl.NumberFormat().format(searchData[i].GiaNhapHang),
      giaban: new Intl.NumberFormat().format(searchData[i].Gia),
      tags: searchData[i].tags,
    };
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow style={{ width: "100%" }}>
              <TableCell>
                <form className="nav-bar__form">
                  <input
                    type="text"
                    className="nav-bar__form-input-admin"
                    placeholder="Tìm kiếm"
                    name="search"
                    onChange={(e) => setTagName(e.target.value)}
                  />
                </form>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell style={{ textAlign: "right" }}>
                <FaEdit
                  style={{
                    color: "#28a745",
                    cursor: "pointer",
                    fontSize: "1.4rem",
                  }}
                  onClick={showModal}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ height: 570, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={150}
          pageSize={3}
          rowsPerPageOptions={[3]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default TableProductMUIDataGrid;
