import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "tensanpham", headerName: "Tên sản phẩm", width: 200 },
  {
    field: "soluongban",
    headerName: "Số lượng bán",
    type: "number",
    width: 150,
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
    width: 200,
  },
];

export default function TableMUI2() {
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
      tensanpham: getData.map((data) => data.TenHH),
      soluongban: quantityArray[i],
      gianhaphang: new Intl.NumberFormat().format(
        getData.map((data) => data.GiaNhapHang)
      ),
      giaban: new Intl.NumberFormat().format(getData.map((data) => data.Gia)),
      doanhthu: new Intl.NumberFormat().format(
        getData.map((data) => data.Gia * quantityArray[i])
      ),
      loinhuan: new Intl.NumberFormat().format(
        getData.map(
          (data) =>
            data.Gia * quantityArray[i] - data.GiaNhapHang * quantityArray[i]
        )
      ),
    };
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
