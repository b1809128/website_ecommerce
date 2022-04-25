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

  function createData(masanpham, soluongban, tongdoanhthu) {
    return { masanpham, soluongban, tongdoanhthu };
  }

  // console.log(unique(product));
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
    rows[i] = createData(codeProduct[i], quantityArray[i], codeProduct[i], 4.0);
  }

  let tongDoanhThu = 0;
  let tongLoiNhuan = 0;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell fontWeight="700" align="right">Số lượng bán</TableCell>
            <TableCell align="right">Giá nhập hàng&nbsp;(VND)</TableCell>
            <TableCell align="right">Giá bán&nbsp;(VND)</TableCell>
            <TableCell align="right">Tổng doanh thu&nbsp;(VND)</TableCell>
            <TableCell align="right">Tổng lợi nhuận&nbsp;(VND)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.masanpham}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {allProduct
                  .filter((data) => data.MSHH === row.masanpham)
                  .map((data) => data.TenHH)}
              </TableCell>
              <TableCell align="right">{row.soluongban}</TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat().format(
                  allProduct
                    .filter((data) => data.MSHH === row.masanpham)
                    .map((data) => data.GiaNhapHang)
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat().format(
                  allProduct
                    .filter((data) => data.MSHH === row.masanpham)
                    .map((data) => data.Gia)
                )}
              </TableCell>
              <TableCell align="right">
                {new Intl.NumberFormat().format(
                  allProduct
                    .filter((data) => data.MSHH === row.masanpham)
                    .map((data) => {
                      tongDoanhThu += data.Gia * row.soluongban;
                      return data.Gia * row.soluongban;
                    })
                )}
              </TableCell>

              <TableCell align="right">
                {new Intl.NumberFormat().format(
                  allProduct
                    .filter((data) => data.MSHH === row.masanpham)
                    .map((data) => {
                      tongLoiNhuan +=
                        data.Gia * row.soluongban -
                        data.GiaNhapHang * row.soluongban;
                      return (
                        data.Gia * row.soluongban -
                        data.GiaNhapHang * row.soluongban
                      );
                    })
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow style={{ width: "100%" }}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              Tổng doanh thu: {new Intl.NumberFormat().format(tongDoanhThu)} VND
            </TableCell>
            <TableCell>
              Tổng lợi nhuận: {new Intl.NumberFormat().format(tongLoiNhuan)} VND
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
