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
            ".\n Số nhà: " +
            address,
        }
      );
      if (res.data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thêm địa chỉ thành công",
          showConfirmButton: false,
          timer: 1500,
        });
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
          "Thay đổi mật khẩu thành công !",
          "Nhấn để tiếp tục",
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
        title: "Bạn có chắc muốn xóa ?",
        text: "Bạn không thể hoàn tác hành động này !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Tiếp tục xóa",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Đã xóa !",
            "Thông tin khách hàng đã được xóa. Hẹn gặp lại quý khách !",
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
              {/*TODO: Address method */}
              <h2 className="check__form-title">THÔNG TIN KHÁCH HÀNG</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">
                    Họ tên<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name1"
                    placeholder="Full Name"
                    className="form-input"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-block">
                  <label for="name">
                    Số điện thoại<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name2"
                    placeholder="Phone Number"
                    className="form-input"
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                  />
                </div>
                <div className="form-block">
                  <label for="address">
                    Địa chỉ<span style={{ color: "#eb0028" }}>*</span>
                  </label>
                  <select
                    className="form-input"
                    value={selectCity}
                    onChange={(e) => setSelectCity(e.target.value)}
                  >
                    <option value="">Tỉnh, Thành phố </option>
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
                  >
                    <option value="">Quận, Huyện </option>
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
                  >
                    <option value="">Phường, Xã</option>
                    {dataWard?.map((data) => {
                      return <option value={data.name}>{data.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form-block">
                  <textarea
                    type="text"
                    id="quantity"
                    placeholder="Số nhà: 29/13, đường 30/4 , Quận Ninh Kiều , Thành phố Cần Thơ "
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={createHandle}>
                    THÊM
                  </button>
                  <button className="btn">CẬP NHẬT</button>
                </div>
              </form>
            </div>
            <div className="check__method">
              {/*TODO: Change Password method */}
              <h2 className="check__form-title">ĐỔI MẬT KHẨU</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="email">
                    Tên đăng nhập<span style={{ color: "#eb0028" }}>*</span>
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
                    Mật khẩu cũ<span style={{ color: "#eb0028" }}>*</span>
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
                    Mật khẩu mới<span style={{ color: "#eb0028" }}>*</span>
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
                    CẬP NHẬT
                  </button>
                </div>
              </form>
              {/*TODO: Delete method */}
              <h2 className="check__form-title">XÓA TÀI KHOẢN</h2>
              <form className="form-section">
                <div className="form-block">
                  <label for="name">Ghi chú</label>
                  <textarea
                    type="text"
                    id="quantity2"
                    placeholder="Write your reason about delete account to support me become better. Thank you and See you later !"
                    // onChange={(e) => setQuantityProduct(e.target.value)}
                  />
                </div>
                <div className="form-flex__btn">
                  <button className="btn" onClick={deleteHandle}>
                    XÓA TÀI KHOẢN
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
