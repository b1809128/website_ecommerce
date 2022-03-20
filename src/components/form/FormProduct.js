import React, { useState } from "react";
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

  const copyArray = [
    '["https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/09/15/image-removebg-preview-15.png","https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/09/15/image-removebg-preview-15.png","https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/09/15/image-removebg-preview-15.png"]',
    {
      Description: "abc",
      Brand: "Apple",
      Type: "Phone",
      Coor: "white",
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
          position: "top-end",
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
        <label for="name">Product ID*</label>
        <input
          type="text"
          id="name"
          placeholder="Product ID"
          className="form-input"
          onChange={(e) => setIdProduct(e.target.value)}
        />
      </div>
      <div className="form-block">
        <label for="name">Product Name*</label>
        <input
          type="text"
          id="name"
          placeholder="Product Name"
          className="form-input"
          onChange={(e) => setNameProduct(e.target.value)}
        />
      </div>

      <div className="form-block">
        <label for="email">Price*</label>
        <input
          type="text"
          id="price"
          className="form-input"
          placeholder="10.000.000 VND"
          onChange={(e) => setPriceProduct(e.target.value)}
        />
      </div>

      <div className="form-block">
        <label for="adress">Quantity*</label>
        <input
          className="form-input"
          type="text"
          id="quantity"
          placeholder="Quantity"
          onChange={(e) => setQuantityProduct(e.target.value)}
        />
      </div>

      <div className="form-block">
        <label for="type">Type*</label>
        <input
          className="form-input"
          type="text"
          id="type"
          placeholder="AP - APPLE"
          onChange={(e) => setTypeProduct(e.target.value)}
        />
      </div>

      <div className="form-block">
        <label for="phone">Tags*</label>
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
          <label for="images">Images*</label>
          <textarea
            className="form-input textarea-sm "
            placeholder='Example: ["https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/09/15/image-removebg-preview-15.png"]'
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
          <label for="notes">Description</label>
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
          Create
        </button>
        <button className="btn" onClick={updateHandle}>
          Update
        </button>
      </div>
    </form>
  );
}
