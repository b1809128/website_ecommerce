import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function TableMUI() {
  const [product, setProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);

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

  function createData(tensanpham, soluongban, doanhthu, giamgia, tongdoanhthu) {
    return { tensanpham, soluongban, doanhthu, giamgia, tongdoanhthu };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  // console.log(unique(product));
  const codeProduct = unique(product);

  var productArray = [];
  for (var i = 0; i < codeProduct.length; i++) {
    // eslint-disable-next-line no-loop-func
    let check = product.filter((data) => data.MSHH === codeProduct[i]);
    productArray.push(check);
  }
  console.log(productArray);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="right">Số lượng bán</TableCell>
            <TableCell align="right">Doanh thu&nbsp;(VND)</TableCell>
            <TableCell align="right">Giảm giá&nbsp;(VND)</TableCell>
            <TableCell align="right">Tổng doanh thu&nbsp;(VND)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.tensanpham}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tensanpham}
              </TableCell>
              <TableCell align="right">{row.soluongban}</TableCell>
              <TableCell align="right">{row.doanhthu}</TableCell>
              <TableCell align="right">{row.giamgia}</TableCell>
              <TableCell align="right">{row.tongdoanhthu}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
