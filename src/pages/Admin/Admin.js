import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import TableCustomer from "../../components/table/TableCustomer";
import TableProduct from "../../components/table/TableProduct";
import Chart from "../../components/chart/Chart";
import "./Admin.css";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import { chartData } from "../../components/chart/chartData";
import TableOrder from "../../components/table/TableOrder";
import { FaEdit } from "react-icons/fa";
import AdminEdit from "../Edit/AdminEdit";
import Modal from "../../components/modal/Modal";
function Admin() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const [productData, setProductData] = useState([]);
  const [bestSaleData, setBestSaleData] = useState([]);
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
      const res2 = await axios.get(
        "http://localhost:5000/product/all?sortBy=PRICE_ASC"
      );
      setProductData(res2.data);
      const res3 = await axios.get("http://localhost:5000/product/bestsale");
      setBestSaleData(res3.data);
    };
    fetch();
  }, [user.token]);

  //TODO: Modal
  const [statusModal, setStatusModal] = useState(false);
  const showModal = () => {
    setStatusModal(true);
  };

  const closeModal = () => {
    setStatusModal(false);
  };

  //TODO: chart
  // console.log(chartData.map(data => data))
  var dataSet = chartData.map((data) => data);

  //TODO: authorized
  if (!authorized) {
    return <Redirect to="/sign-in" />;
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
          <div className="admin__col-6">
            <div className="admin__item-sm">
              <Chart
                title={dataSet[0].title}
                color={dataSet[0].color}
                data={dataSet[0].data}
              />
            </div>
            <div className="admin__item-sm">
              <Chart
                title={dataSet[1].title}
                color={dataSet[1].color}
                data={dataSet[1].data}
              />
            </div>
            <div className="admin__item-sm">
              <Chart
                title={dataSet[2].title}
                color={dataSet[2].color}
                data={dataSet[2].data}
              />
            </div>
            <div className="admin__item-sm">
              <Chart
                title={dataSet[3].title}
                color={dataSet[3].color}
                data={dataSet[3].data}
              />
            </div>
          </div>
          <div className="admin__col-4">
            <div className="admin__item-lg">
              <Chart
                title={dataSet[4].title}
                color={dataSet[4].color}
                data={dataSet[4].data}
              />
              <Chart
                title={dataSet[5].title}
                color={dataSet[5].color}
                data={dataSet[5].data}
              />
            </div>
          </div>
        </div>
        <div className="admin__row">
          <div className="admin__col-6">
            <div className="admin__item-lg">
              <div className="admin__header">
                <h1 className="admin__title">PRODUCT</h1>
                <FaEdit
                  style={{
                    color: "#28a745",
                    cursor: "pointer",
                  }}
                  onClick={showModal}
                />
              </div>
              <TableProduct props={productData} />
            </div>
          </div>
          <div className="admin__col-4">
            <div className="admin__item-lg">
              <div className="admin__header">
                <h1 className="admin__title">USER</h1>
              </div>
              <TableCustomer />
            </div>
          </div>
        </div>
        <div className="admin__row">
          <div className="admin__col-6">
            <div className="admin__item-lg">
              <h1 className="admin__title">BEST SALE OF MONTH</h1>
              <TableProduct props={bestSaleData} />
            </div>
          </div>
          <div className="admin__col-4">
            <div className="admin__item-lg">
              <h1 className="admin__title">ORDER</h1>
              <TableOrder />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
