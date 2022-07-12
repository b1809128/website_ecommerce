import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { ExportCSV } from "../ExportCSV/ExportCSV";
const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "tensanpham", headerName: "Tên sản phẩm", width: 250 },
  {
    field: "soluongban",
    headerName: "Số lượng bán",
    type: "number",
    width: 100,
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
    field: "doanhthu",
    headerName: "Doanh thu",
    type: "number",
    width: 150,
  },
  {
    field: "loinhuan",
    headerName: "Lợi nhuận",
    type: "number",
    width: 250,
  },
];

export default function TableMUIDataGrid() {
  const [product, setProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  let tongDoanhThu = 0;
  let tongLoiNhuan = 0;
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/manage/order/details"
        );
        setProduct(response.data);
        const response2 = await axios.get("http://localhost:5000/product/all");
        setAllProduct(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  function unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i].MSHH) === -1) {
        newArr.push(arr[i].MSHH);
      }
    }
    return newArr;
  }

  const codeProduct = unique(product);

  var productArray = [];
  for (var i = 0; i < codeProduct.length; i++) {
    // eslint-disable-next-line no-loop-func
    let check = product.filter((data) => data.MSHH === codeProduct[i]);
    productArray.push(check);
  }

  var quantityArray = [];
  for (let i = 0; i < productArray.length; i++) {
    var quantity = 0;
    for (let j = 0; j < productArray[i].length; j++) {
      quantity += productArray[i][j].SoLuong;
    }
    quantityArray.push(quantity);
  }

  var rows = [];

  for (let i = 0; i < codeProduct.length; i++) {
    let getData = allProduct
      // eslint-disable-next-line no-loop-func
      .filter((data) => data.MSHH === codeProduct[i]);
    rows[i] = {
      id: i,
      tensanpham: getData.map((data) => data.TenHH).map((data) => data)[0],
      soluongban: quantityArray[i],
      gianhaphang: new Intl.NumberFormat().format(
        getData.map((data) => data.GiaNhapHang)
      ),
      giaban: new Intl.NumberFormat().format(getData.map((data) => data.Gia)),
      doanhthu: new Intl.NumberFormat().format(
        // eslint-disable-next-line no-loop-func
        getData.map((data) => {
          tongDoanhThu += data.Gia * quantityArray[i];
          return data.Gia * quantityArray[i];
        })
      ),
      loinhuan: new Intl.NumberFormat().format(
        getData.map(
          // eslint-disable-next-line no-loop-func
          (data) => {
            tongLoiNhuan +=
              data.Gia * quantityArray[i] - data.GiaNhapHang * quantityArray[i];
            return (
              data.Gia * quantityArray[i] - data.GiaNhapHang * quantityArray[i]
            );
          }
        )
      ),
    };
  }

  // console.log(rows[0].tensanpham);
  return (
    <>
      <div style={{ height: 375, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ width: "100%" }}>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <ExportCSV
                  csvData={rows}
                  fileName={
                    "ThongKeDoanhThu" +
                    new Date().getDay() +
                    "_" +
                    new Date().getMonth() +
                    "_" +
                    new Date().getYear()
                  }
                />
              </TableCell>
              <TableCell>
                Tổng doanh thu: {new Intl.NumberFormat().format(tongDoanhThu)}{" "}
                VND
              </TableCell>
              <TableCell>
                Tổng lợi nhuận: {new Intl.NumberFormat().format(tongLoiNhuan)}{" "}
                VND
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}
