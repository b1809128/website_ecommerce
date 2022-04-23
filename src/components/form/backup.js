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
  const [brandProduct, setBrandProduct] = useState([]);
  // console.log(imageProductUpload);
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

  //TODO: Upload Images function
  const [image, setImage] = useState({ preview: [], data: [] });

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

      let formData = new FormData();
      // formData.append("file", image.data);
      let imagesDataArray = [];
      let newImagesName = [];
      let now = new Date();
      for (let i = 0; i < image.data.length; i++) {
        formData.append("file", image.data[i]);
        imagesDataArray.push(image.data[i].name);
      }
      //TODO:Images Name Process
      for (let i = 0; i < imagesDataArray.length; i++) {
        let originalName = imagesDataArray[i].substring(
          0,
          imagesDataArray[i].lastIndexOf(".")
        );
        let ext = imagesDataArray[i].substring(
          imagesDataArray[i].lastIndexOf(".") + 1,
          imagesDataArray[i].length
        );
        const uniqueSuffix =
          originalName +
          "_" +
          now.getMonth() +
          now.getDate() +
          now.getFullYear() +
          "_" +
          now.getHours() +
          now.getMinutes() +
          now.getSeconds();

        newImagesName.push(uniqueSuffix + "." + ext);
      }

      var lastImageNameForUpdate = newImagesName.map(
        (data) => `http://localhost:5000/images/${idProduct}/` + data
      );

      await axios.post(
        `http://localhost:5000/upload?folderData=${idProduct}`,
        formData
      );

      await axios.post("http://localhost:5000/manage/image/upload", {
        MSHH: idProduct,
        PATH: lastImageNameForUpdate,
      });
      if (res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thêm sản phẩm thành công !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //FIXME: Update wrong in database
  const updateHandle = async (e) => {
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

      handleSubmitForUpdate();
      if (res.data) {
        Swal.fire(
          "Cập nhật sản phẩm thành công !",
          "Nhấn để tiếp tục",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForUpdate = async () => {
    // e.preventDefault();
    let formData = new FormData();
    // formData.append("file", image.data);
    let imagesDataArray = [];
    let newImagesName = [];
    let now = new Date();
    for (let i = 0; i < image.data.length; i++) {
      formData.append("file", image.data[i]);
      imagesDataArray.push(image.data[i].name);
    }
    //TODO:Images Name Process
    for (let i = 0; i < imagesDataArray.length; i++) {
      let originalName = imagesDataArray[i].substring(
        0,
        imagesDataArray[i].lastIndexOf(".")
      );
      let ext = imagesDataArray[i].substring(
        imagesDataArray[i].lastIndexOf(".") + 1,
        imagesDataArray[i].length
      );
      const uniqueSuffix =
        originalName +
        "_" +
        now.getMonth() +
        now.getDate() +
        now.getFullYear() +
        "_" +
        now.getHours() +
        now.getMinutes() +
        now.getSeconds();

      newImagesName.push(uniqueSuffix + "." + ext);
    }

    var lastImageNameForUpdate = newImagesName.map(
      (data) => `http://localhost:5000/images/${idProduct}/` + data
    );

    axios.post(
      `http://localhost:5000/upload?folderData=${idProduct}`,
      formData
    );

    axios.put(
      `http://localhost:5000/manage/product/image/update/${idProduct}`,
      {
        MSHH: idProduct,
        PATH: lastImageNameForUpdate,
      }
    );
  };

  const handleFileChange = (e) => {
    const arrayFile = e.target.files;
    let previewArray = [];
    let previewURLArray = [];
    for (let i = 0; i < arrayFile.length; i++) {
      previewArray.push(arrayFile[i]);
      previewURLArray.push(URL.createObjectURL(arrayFile[i]));
    }
    // console.log(previewArray.map(data=>data));
    const img = {
      preview: previewURLArray,
      data: previewArray,
    };
    setImage(img);
  };

  return (
    <form className="form-section" enctype="multipart/form-data">
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
          Mã loại hàng<span style={{ color: "#eb0028" }}>*</span>
        </label>
        <select
          className="form-input"
          value={typeProduct}
          onChange={(e) => setTypeProduct(e.target.value)}
        >
          <option value="Chọn">Lựa chọn</option>
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
        <label for="name">
          Tên thư mục:
          <span style={{ color: "#eb0028" }}>* (Mặc định)</span>
        </label>
        <input className="form-input" value={idProduct} type="text" />
        <div className="form-flex">
          {image.preview.map((data) => {
            return <img src={data} width="100" height="100" alt="" />;
          })}
        </div>
        <input
          type="file"
          name="file"
          multiple
          className="form-input"
          onChange={handleFileChange}
          style={{ margin: "10px 0" }}
        />
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
        <button onClick={createHandle} className="btn">
          THÊM
        </button>
        <button className="btn" onClick={updateHandle}>
          CẬP NHẬT
        </button>
      </div>
    </form>
  );
}
