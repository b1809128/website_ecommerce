import React, { useState, useEffect } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
export default function FormProduct() {
  const [idProduct, setIdProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [quantityProduct, setQuantityProduct] = useState("");
  const [descProduct, setDescProduct] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [tagProduct, setTagProduct] = useState("");
  const [imageProductUpload, setImageProductUpload] = useState({});
  const [brandProduct, setBrandProduct] = useState([]);
  console.log(imageProductUpload);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/manage/product/brand"
        );
        setBrandProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPI();
  }, []);

  const copyArray = [
    '["/images/products/BRAND_FOLDER/PRODUCT_NAME_FOLDER","/images/products/apple/12pro/1.png"]',
    {
      Description: "abc",
      Brand: "Apple",
      Type: "Phone",
      Color: "white",
      Memory: 512,
      Screen:
        "OLED Resolution: 1284 x 2778 Pixels, 3 cameras 12 MP, 12 MP Wide screen: 6.7",
      OS: "iOS 14",
      CPU: "Apple A14 Bionic 6 cores",
      ROM: "512GB",
      RAM: "6GB",
      Network: "5G",
      SIM: "1 Nano SIM & 1 eSIM",
      Weight: "228g",
      Battery: "3687mAh",
    },
  ];

  //FIXME: Must be parse to JSON after push to server
  const createHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/manage/product/add", {
        MSHH: idProduct,
        TenHH: nameProduct,
        Gia: priceProduct,
        SoLuongHang: quantityProduct,
        Mota: JSON.parse(descProduct),
        MaLoaiHang: typeProduct,
        tags: `'${tagProduct}'`,
      });
      await axios.post("http://localhost:5000/manage/image/upload", {
        MSHH: idProduct,
        PATH: JSON.parse(imageProductUpload),
      });
      if (res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Added Product Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FIXME: Update wrong in database
  const updateHandle = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/manage/product/update/${idProduct}`,
        {
          MSHH: idProduct,
          TenHH: nameProduct,
          Gia: priceProduct,
          SoLuongHang: quantityProduct,
          Mota: JSON.parse(descProduct),
          MaLoaiHang: typeProduct,
          tags: `'${tagProduct}'`,
        }
      );

      await axios.put(
        `http://localhost:5000/manage/product/image/update/${idProduct}`,
        {
          MSHH: idProduct,
          PATH: JSON.parse(imageProductUpload),
        }
      );
      if (res.data) {
        Swal.fire(
          "Updated product successfully !",
          "You clicked the button!",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="form-section">
      <div className="form-block">
        <label for="name">
          Mã sản phẩm<span style={{ color: "#eb0028" }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Product ID"
          className="form-input"
          onChange={(e) => setIdProduct(e.target.value)}
        />
      </div>
      <div className="form-block">
        <label for="name">
          Tên sản phẩm<span style={{ color: "#eb0028" }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Product Name"
          className="form-input"
          onChange={(e) => setNameProduct(e.target.value)}
        />
      </div>

      <div className="form-block">
        <label for="email">
          Giá<span style={{ color: "#eb0028" }}>*</span>
        </label>
        <input
          type="text"
          id="price"
          className="form-input"
          placeholder="10.000.000 VND"
          onChange={(e) => setPriceProduct(e.target.value)}
        />
      </div>

      <div className="form-block">
        <label for="adress">
          Số lượng hàng<span style={{ color: "#eb0028" }}>*</span>
        </label>
        <input
          className="form-input"
          type="text"
          id="quantity"
          placeholder="Quantity"
          onChange={(e) => setQuantityProduct(e.target.value)}
        />
      </div>

      <div className="form-block">
        <label for="type">
          Loại hàng<span style={{ color: "#eb0028" }}>*</span>
        </label>
        <select
          className="form-input"
          value={typeProduct}
          onChange={(e) => setTypeProduct(e.target.value)}
        >
          {brandProduct.map((data) => {
            return (
              <>
                <option value={data.MaLoaiHang}>
                  {data.MaLoaiHang}-{data.TenLoaiHang}
                </option>
              </>
            );
          })}
        </select>
      </div>

      <div className="form-block">
        <label for="phone">
          Tags<span style={{ color: "#eb0028" }}>*</span>
        </label>
        <input
          type="text"
          id="tag"
          className="form-input"
          placeholder="Phone,Apple,New2022"
          onChange={(e) => setTagProduct(e.target.value)}
        />
      </div>
      <div className="form-block">
        <div
          className="relative"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label for="images">
            Hình ảnh<span style={{ color: "#eb0028" }}>*</span>
          </label>
          {/* <input
            type="file"
            id="fileimage"
            className="form-input"
            onChange={(e) => setImageProductUpload(e.target.value)}
          /> */}
          <textarea
            className="form-input textarea-sm "
            placeholder='Example: ["/images/products/BRAND_FOLDER/PRODUCT_NAME_FOLDER"]'
            onChange={(e) => setImageProductUpload(e.target.value)}
          ></textarea>
          <button
            className="copy-btn"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(copyArray[0]);
            }}
          >
            <AiOutlineCopy />
          </button>
        </div>
      </div>
      <div className="form-block">
        <div
          className="relative"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label for="notes">
            Mô tả<span style={{ color: "#eb0028" }}>*</span>
          </label>
          <textarea
            // className="textarea-sm"
            placeholder='Example: {                      
            "Brand": "Apple",
            "Type": "Phone",
            "Color": "white",
            ...
        }'
            onChange={(e) => setDescProduct(e.target.value)}
          ></textarea>
          <button
            className="copy-btn"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(
                JSON.stringify(copyArray[1], undefined, 2)
              );
            }}
          >
            <AiOutlineCopy />
          </button>
        </div>
      </div>
      <div className="form-flex__btn">
        <button className="btn" onClick={createHandle}>
          THÊM
        </button>
        <button className="btn" onClick={updateHandle}>
          CẬP NHẬT
        </button>
      </div>
    </form>
  );
}
