import "./edit.css";
import "../CheckOut/checkout.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FormProduct from "../../components/form/FormProduct";
import Swal from "sweetalert2";

export default function AdminEdit() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const [allProduct, setAllProduct] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  //TODO: Auto fetchAPI
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAPI = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });

      const res2 = await axios.get("http://localhost:5000/product/all");
      setAllProduct(res2.data);

      const res3 = await axios.get("http://localhost:5000/manage/customer");
      setAllCustomer(res3.data);

      if (res1.data.logged) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };
    fetchAPI();
  }, [user.token]);

  //TODO: Upload Images function
  const [idUpload, setIdUpload] = useState("");
  // const [folder, setFolder] = useState("");
  const [image, setImage] = useState({ preview: [], data: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      (data) => `http://localhost:5000/images/products/${idUpload}/` + data
    );


    await axios.put(
      `http://localhost:5000/manage/product/image/update/${idUpload}`,
      {
        MSHH: idUpload,
        PATH: lastImageNameForUpdate,
      }
    );

    const response = await axios.post(
      `http://localhost:5000/upload?folderData=${idUpload}`,
      formData
    );

    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Upload hình ảnh thành công !",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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

  //TODO: Delete Product function
  //FIXME: After delete product modal appears when go admin page
  const [idProductDelete, setIdProductDelete] = useState("");

  const deleteHandle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/manage/product/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const checkProductDelete = (e) => {
    e.preventDefault();
    if (idProductDelete) {
      Swal.fire({
        title: "Bạn có chắc muốn xóa ?",
        text: "Bạn không thể hoàn tác hành động này !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tiếp tục xóa",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteHandle(idProductDelete);
          Swal.fire(
            "Đã xóa!",
            `${idProductDelete} đã được xóa thành công.`,
            "success"
          );
        }
      });
    }
  };

  //TODO: Update Customer function
  const [roleCustomer, setRoleCustomer] = useState("");
  const [idCustomer, setIdCustomer] = useState("");

  const updateCustomerHandle = async () => {
    // e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/manage/customer/updateonly/${idCustomer}`,
        {
          role: roleCustomer,
        }
      );
      if (response.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật phân quyền thành công !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!authorized) {
    Swal.fire({
      icon: "error",
      title: "Bạn không có quyền truy cập !",
    });
    return <Redirect to="/dang-nhap" />;
  }

  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <div className="row">
            <div className="check__form">
              {/*TODO: Product method */}
              <h2 className="check__form-title">CẬP NHẬT SẢN PHẨM</h2>
              <FormProduct />
            </div>
            <div className="check__method">
              {/*TODO:Upload method */}
              <h2 className="check__method-title">CẬP NHẬT HÌNH ẢNH</h2>

              <form
                className="form-section"
                enctype="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="form-block">
                  <label for="name">
                    Mã sản phẩm<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    value={idUpload}
                    onChange={(e) => setIdUpload(e.target.value)}
                  >
                    {allProduct.map((data, index) => {
                      return (
                        <>
                          <option value={data.MSHH}>{data.MSHH}</option>
                        </>
                      );
                    })}
                  </select>
                  <label for="name">
                    Tên thư mục:
                    <span style={{ color: "#eb0028" }}>
                      * (Mặc định)
                    </span>
                  </label>
                  <input
                    className="form-input"
                    value={idUpload}
                    // onChange={(e) => setFolder(e.target.value)}
                    type="text"
                  />
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
                <button className="btn" type="submit">
                  Cập nhật
                </button>
              </form>
              {/*TODO: Delete method */}
              <h2 className="check__form-title">XÓA SẢN PHẨM</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">
                    Mã sản phẩm<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    value={idProductDelete}
                    onChange={(e) => setIdProductDelete(e.target.value)}
                  >
                    {allProduct.map((data, index) => {
                      return (
                        <>
                          <option value={data.MSHH}>{data.MSHH}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <button className="btn" onClick={checkProductDelete}>
                  XÓA SẢN PHẨM
                </button>
              </form>
              {/*TODO: Customer method */}
              <h2 className="check__form-title">PHÂN QUYỀN NGƯỜI DÙNG</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="email">
                    Tên người dùng<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    value={idCustomer}
                    onChange={(e) => setIdCustomer(e.target.value)}
                  >
                    {allCustomer.map((data, index) => {
                      return (
                        <>
                          <option value={data.id}>
                            {(index += 1)}. {data.user}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="form-block">
                  <label for="role">
                    Phân quyền<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    value={roleCustomer}
                    onChange={(e) => setRoleCustomer(e.target.value)}
                  >
                    <option value="">Lựa chọn</option>
                    <option value="customer">Customer</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>
                <button className="btn" onClick={updateCustomerHandle}>
                  CẬP NHẬT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
