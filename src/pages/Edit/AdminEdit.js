import "./edit.css";
import "../CheckOut/checkout.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import { AiOutlineCopy } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
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

  //TODO: Create Product function
  const [idProduct, setIdProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [quantityProduct, setQuantityProduct] = useState("");
  const [descProduct, setDescProduct] = useState("");
  const [typeProduct, setTypeProduct] = useState("");
  const [tagProduct, setTagProduct] = useState("");

  //FIXME: Must be parse to JSON after push to server
  const createHandle = async () => {
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
        alert(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Upload Images function
  const [idProductUpload, setIdProductUpload] = useState("");
  const [imageProductUpload, setImageProductUpload] = useState({});

  const uploadHandle = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/manage/image/upload",
        {
          MSHH: idProductUpload,
          PATH: JSON.parse(imageProductUpload),
        }
      );
      if (res.data) {
        alert(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Delete Product function
  const [idProductDelete, setIdProductDelete] = useState("");

  const deleteHandle = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/manage/product/delete/${idProductDelete}`
      );
      if (res.data) {
        alert(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Update Customer function
  const [roleCustomer, setRoleCustomer] = useState("");
  const [idCustomer, setIdCustomer] = useState("");

  const updateCustomerHandle = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/manage/customer/updateonly/${idCustomer}`,
        {
          role: roleCustomer,
        }
      );
      alert(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //TODO:Copy to clipboard function
  const copyArray = [
    '["https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/09/15/image-removebg-preview-15.png","",""]',
    {
      Description: "",
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

  if (!authorized) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <LocationBar />
          <div className="row">
            <Link
              to="/admin"
              className="link"
              style={{
                color: "#eb0028",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              <BiArrowBack />
              Back to Admin
            </Link>
          </div>
          <div className="row">
            <div className="check__form">
              {/*TODO: Product method */}
              <h2 className="check__form-title">Product</h2>
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
                  <button className="btn">Update</button>
                </div>
              </form>
            </div>
            <div className="check__method">
              {/*TODO:Upload method */}
              <h2 className="check__method-title">Upload Images</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Product ID*</label>
                  <select
                    className="form-input"
                    value={idProductUpload}
                    onChange={(e) => setIdProductUpload(e.target.value)}
                  >
                    {allProduct.map((data, index) => {
                      return (
                        <>
                          <option value={data.MSHH}>
                            {index} - {data.MSHH.toUpperCase()}
                          </option>
                        </>
                      );
                    })}
                  </select>
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
                <div className="form-flex__btn">
                  <button className="btn" onClick={uploadHandle}>
                    Upload
                  </button>
                </div>
              </form>
              {/*TODO: Delete method */}
              <h2 className="check__form-title">Delete Product</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Product ID*</label>
                  <select
                    className="form-input"
                    value={idProductDelete}
                    onChange={(e) => setIdProductDelete(e.target.value)}
                  >
                    {allProduct.map((data, index) => {
                      return (
                        <>
                          <option value={data.MSHH}>
                            {index} - {data.MSHH.toUpperCase()}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={deleteHandle}>
                    Delete
                  </button>
                </div>
              </form>
              {/*TODO: Customer method */}
              <h2 className="check__form-title">Customer</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="email">Username*</label>
                  <select
                    className="form-input"
                    value={idCustomer}
                    onChange={(e) => setIdCustomer(e.target.value)}
                  >
                    {allCustomer.map((data, index) => {
                      return (
                        <>
                          <option value={data.id}>
                            {index} - {data.user.toUpperCase()}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="form-block">
                  <label for="role">Role*</label>
                  <input
                    type="text"
                    id="role"
                    placeholder="Role"
                    className="form-input"
                    onChange={(e) => setRoleCustomer(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={updateCustomerHandle}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
