import "./edit.css";
import "../CheckOut/checkout.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import crypto from "crypto";
import Swal from "sweetalert2";
import { vnAPI } from "./vnAPI";
export default function CustomerEdit() {
  const { user, dispatch } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);

  const [selectCity, setSelectCity] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [selectWard, setSelectWard] = useState("");
  const [dataWard, setDataWard] = useState([]);

  const history = useHistory();

  //TODO: Auto fetchAPI
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAPI = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/profile", {
        token: user.token,
      });

      if (res1.data.logged) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };

    const fetchLocation = () => {
      if (selectCity) {
        var resultCity = vnAPI.filter((data) => data.name === selectCity);
        // console.log(resultCity);
        if (selectDistrict) {
          var getDataDistrict = resultCity.map((data) => data.districts);
          var getDataDistrictOnly = getDataDistrict[0].filter(
            (data) => data.name === selectDistrict
          );
          var getDataWard = getDataDistrictOnly.map((data) => data.wards)[0];
          // console.log(getDataWard);s
          setDataWard(getDataWard);
        } else {
          setDataWard([]);
        }
      } else {
        setDataWard([]);
      }
    };

    fetchLocation();
    fetchAPI();
  }, [selectCity, selectDistrict, user.token]);

  //TODO: Create Product function
  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  //FIXME: Must be parse to JSON after push to server
  const createHandle = async () => {
    // e.preventDefault();
    try {
      if (
        fullname !== "" &&
        phoneNumber !== "" &&
        email !== "" &&
        selectCity !== "" &&
        selectDistrict !== "" &&
        selectWard !== "" &&
        address !== ""
      ) {
        const res = await axios.post(
          "http://localhost:5000/customer/address/add",
          {
            id: user.result[0].id,
            fullname: fullname,
            phonenumber: phoneNumber,
            email: email,
            addressdetails:
              selectCity +
              ", " +
              selectDistrict +
              ", " +
              selectWard +
              ".\n  - S??? nh??: " +
              address,
          }
        );
        if (res.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Th??m th??ng tin th??nh c??ng",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandle = async () => {
    // e.preventDefault();
    try {
      if (
        fullname !== "" &&
        phoneNumber !== "" &&
        email !== "" &&
        selectCity !== "" &&
        selectDistrict !== "" &&
        selectWard !== "" &&
        address !== ""
      ) {
        const res = await axios.put(
          `http://localhost:5000/customer/update/address/${user.result[0].id}`,
          {
            fullname: fullname,
            phonenumber: phoneNumber,
            email: email,
            addressdetails:
              selectCity +
              ", " +
              selectDistrict +
              ", " +
              selectWard +
              ".\n  - S??? nh??: " +
              address,
          }
        );
        if (res.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "C???p nh???t th??ng tin th??nh c??ng",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Update Password function
  const [password, setPassword] = useState("");
  const changePassword = async (e) => {
    e.preventDefault();
    var hashPash = crypto.createHash("md5").update(password).digest("hex");
    try {
      const res = await axios.patch(
        `http://localhost:5000/manage/customer/updateonly/${user.result[0].id}`,
        {
          password: hashPash,
        }
      );

      if (res.data) {
        Swal.fire(
          "Thay ?????i m???t kh???u th??nh c??ng !",
          "Nh???n ????? ti???p t???c",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: Delete Product function
  const deleteHandle = (e) => {
    e.preventDefault();
    if (user) {
      Swal.fire({
        title: "B???n c?? ch???c mu???n x??a ?",
        text: "B???n kh??ng th??? ho??n t??c h??nh ?????ng n??y !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ti???p t???c x??a",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "???? x??a !",
            "Th??ng tin kh??ch h??ng ???? ???????c x??a. H???n g???p l???i qu?? kh??ch !",
            "success"
          );
          redirectAfterDelete();
        }
      });
    }
  };

  const redirectAfterDelete = async () => {
    try {
      history.push("/dang-ky");
      dispatch({ type: "LOGOUT" });
      await axios.delete(
        `http://localhost:5000/customer/delete/${user.result[0].id}`
      );
      await axios.get("http://localhost:5000/auth/logout");
    } catch (error) {
      console.log(error);
    }
  };

  if (!authorized) {
    Swal.fire({
      icon: "error",
      title: "B???n kh??ng c?? quy???n truy c???p ho???c h???t h???n ????ng nh???p !",
    });
    return <Redirect to="/dang-nhap" />;
  }
  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <div className="row">
            <div className="check__form">
              {/*TODO: Address method */}
              <h2 className="check__form-title">TH??NG TIN KH??CH H??NG</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">
                    H??? t??n<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name1"
                    placeholder="Full Name"
                    className="form-input"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-block">
                  <label for="name">
                    S??? ??i???n tho???i<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name2"
                    placeholder="Phone Number"
                    className="form-input"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="form-block">
                  <label for="email">
                    Email<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="price"
                    className="form-input"
                    placeholder="rabbit@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-block">
                  <label for="address">
                    ?????a ch???<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    value={selectCity}
                    onChange={(e) => setSelectCity(e.target.value)}
                    required
                  >
                    <option value="">T???nh, Th??nh ph??? </option>
                    {vnAPI.map((data) => {
                      return <option value={data.name}>{data.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form-block">
                  <select
                    className="form-input"
                    value={selectDistrict}
                    onChange={(e) => setSelectDistrict(e.target.value)}
                    required
                  >
                    <option value="">Qu???n, Huy???n </option>
                    {selectCity !== ""
                      ? vnAPI
                          .filter((data) => data.name === selectCity)
                          .map((data) => data.districts)[0]
                          .map((data) => {
                            return (
                              <option value={data.name}>{data.name}</option>
                            );
                          })
                      : []}
                  </select>
                </div>
                <div className="form-block">
                  <select
                    className="form-input"
                    value={selectWard}
                    onChange={(e) => setSelectWard(e.target.value)}
                    required
                  >
                    <option value="">Ph?????ng, X??</option>
                    {dataWard?.map((data) => {
                      return <option value={data.name}>{data.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form-block">
                  <textarea
                    type="text"
                    id="quantity"
                    placeholder="S??? nh??: 29/13, ???????ng 30/4 , Qu???n Ninh Ki???u , Th??nh ph??? C???n Th?? "
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={createHandle}>
                    TH??M
                  </button>
                  <button className="btn" onClick={updateHandle}>
                    C???P NH???T
                  </button>
                </div>
              </form>
            </div>
            <div className="check__method">
              {/*TODO: Change Password method */}
              <h2 className="check__form-title">?????I M???T KH???U</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="email">
                    T??n ????ng nh???p<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="price2"
                    className="form-input"
                    placeholder="Your Username"
                  />
                </div>

                <div className="form-block">
                  <label for="role">
                    M???t kh???u c??<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="password"
                    id="role1"
                    placeholder="Old Password"
                    className="form-input"
                  />
                </div>
                <div className="form-block">
                  <label for="role">
                    M???t kh???u m???i<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="password"
                    id="role2"
                    placeholder="New Password"
                    className="form-input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={changePassword}>
                    C???P NH???T
                  </button>
                </div>
              </form>
              {/*TODO: Delete method */}
              <h2 className="check__form-title">X??A T??I KHO???N</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Ghi ch??</label>
                  <textarea
                    type="text"
                    id="quantity2"
                    placeholder="Write your reason about delete account to support me become better. Thank you and See you later !"
                    // onChange={(e) => setQuantityProduct(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={deleteHandle}>
                    X??A T??I KHO???N
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
