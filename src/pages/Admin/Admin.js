import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import TableCustomer from "../../components/table/TableCustomer";
import "./Admin.css";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import TableOrder from "../../components/table/TableOrder";
import AdminEdit from "../Edit/AdminEdit";
import Modal from "../../components/modal/Modal";
import Swal from "sweetalert2";
import TableMUIDataGrid from "../../components/table/TableMUIDataGrid";
import AdminBar from "../../components/bar/adminbar/AdminBar";
import Chart from "../../components/chart/Chart";
import { chartData } from "../../components/chart/chartData";
import TableProductMUIDataGrid from "../../components/table/TableProductMUIDataGrid";
import TableBestSaleMUIDataGrid from "../../components/table/TableBestSaleMUIDataGrid";
function Admin() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [productOrder, setProductOrder] = useState([]);
  let tongDoanhThu = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });
      if (res1.data.logged) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
      const res3 = await axios.get("http://localhost:5000/manage/api");
      const res4 = await axios.get("http://localhost:5000/manage/product");
      const res5 = await axios.get(
        "http://localhost:5000/manage/order/details"
      );

      setCustomerData(res3.data);
      setAllProduct(res4.data);
      setProductOrder(res5.data);
    };
    fetch();
  }, [user.token]);

  function unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i].MSHH) === -1) {
        newArr.push(arr[i].MSHH);
      }
    }
    return newArr;
  }

  const codeProduct = unique(productOrder);

  var productArray = [];
  for (var i = 0; i < codeProduct.length; i++) {
    // eslint-disable-next-line no-loop-func
    let check = productOrder.filter((data) => data.MSHH === codeProduct[i]);
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
        // eslint-disable-next-line no-loop-func
        getData.map((data) => {
          tongDoanhThu += data.Gia * quantityArray[i];
          return data.Gia * quantityArray[i];
        })
      ),
    };
  }

  //TODO: Modal
  const [statusModal, setStatusModal] = useState(false);
  const showModal = () => {
    setStatusModal(true);
  };

  const closeModal = () => {
    setStatusModal(false);
  };

  //TODO: Chart Data map
  var dataSet = chartData.map((data) => data);

  //TODO: authorized
  if (!authorized) {
    Swal.fire({
      icon: "error",
      title: "Bạn không có quyền truy cập !",
    });
    return <Redirect to="/dang-nhap" />;
  }

  return (
    <div className="admin">
      <Modal
        status={statusModal}
        children={<AdminEdit />}
        closeModal={closeModal}
      />
      <div className="admin-section">
        <div className="admin__row">
          <LocationBar />
        </div>
        <div className="admin__row">
          <AdminBar />
        </div>
        <div className="admin__row">
          <div className="admin__item-sm">
            <Chart
              title={dataSet[0].title}
              color={dataSet[0].color}
              data={dataSet[0].data}
              number={customerData.length}
            />
          </div>
          <div className="admin__item-sm">
            <Chart
              title={dataSet[1].title}
              color={dataSet[1].color}
              data={dataSet[1].data}
              number={productOrder.length}
            />
          </div>
          <div className="admin__item-sm">
            <Chart
              title={dataSet[2].title}
              color={dataSet[2].color}
              data={dataSet[2].data}
              number={allProduct.length}
            />
          </div>
          <div className="admin__item-sm">
            <Chart
              title={dataSet[3].title}
              color={dataSet[3].color}
              data={dataSet[3].data}
              number={tongDoanhThu}
            />
          </div>
        </div>
        <div id="thongkedoanhso"></div>

        <div className="admin__row">
          <h1 className="admin__title">THỐNG KÊ DOANH THU</h1>
          <TableMUIDataGrid />
          <div id="quanlysanpham"></div>
        </div>

        <div className="admin__row">
          <h1 className="admin__title">QUẢN LÝ SẢN PHẨM</h1>
          <TableProductMUIDataGrid showModal={showModal} />
          <div id="quanlysanpham"></div>
        </div>

        <div className="admin__row">
          <h1 className="admin__title">SẢN PHẨM BÁN CHẠY</h1>
          <TableBestSaleMUIDataGrid showModal={showModal} />
          <div id="quanlysanpham"></div>
        </div>

        <div className="admin__row">
          <div className="admin__col-5">
            <div className="admin__item-lg">
              <h1 className="admin__title">QUẢN LÝ ĐƠN HÀNG</h1>
              <TableOrder />
            </div>
          </div>
          <div className="admin__col-5">
            <div className="admin__item-lg">
              <div className="admin__header">
                <h1 className="admin__title">QUẢN LÝ NGƯỜI DÙNG</h1>
              </div>
              <TableCustomer click={showModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
