import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

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
export default function TableBestSaleMUIDataGrid({ showModal }) {
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
      masp: getData.map((data) => data.MSHH),
      tensanpham: getData.map((data) => data.TenHH),
      hinhanh: getData.map((data) => JSON.parse(data.PATH)[0]),
      soluongban: quantityArray[i],
      gianhaphang: new Intl.NumberFormat().format(
        getData.map((data) => data.GiaNhapHang)
      ),
      giaban: new Intl.NumberFormat().format(getData.map((data) => data.Gia)),
      tags: getData.map((data) => data.tags),
    };
  }

  return (
    <>
      <div style={{ height: 570, width: "100%" }}>
        <DataGrid
          rows={rows.filter((data) => data.soluongban > 5)}
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
