import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import TableCustomer from "../../components/table/TableCustomer";
import TableProduct from "../../components/table/TableProduct";
import Chart from "../../components/chart/Chart";
import "./Admin.css";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import { chartData } from "./chartData";
function Admin() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [bestSaleData, setBestSaleData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res1 = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });
      //   console.log(res);
      if (res1.data.logged) {
        setAuthorized(true);
        // setAuthText(res.data.message);
      } else {
        setAuthorized(false);
        // setAuthText(res.data.message);
      }
      const res2 = await axios.get("http://localhost:5000/manage/customer");
      setCustomerData(res2.data);
      const res3 = await axios.get(
        "http://localhost:5000/product/all?sortBy=PRICE_ASC"
      );
      setProductData(res3.data);
      const res4 = await axios.get("http://localhost:5000/product/bestsale");
      setBestSaleData(res4.data);
    };
    fetch();
  }, [user.token]);
  if (!authorized) {
    // alert("You are not authorized !");
    return <Redirect to="/sign-in" />;
  }

  // console.log(chartData.map(data => data))
  var dataSet = chartData.map((data) => data);
  return (
    <div className="admin">
      <div className="admin-section">
        <div className="admin__row">
          <LocationBar />
        </div>
        <div className="admin__row">
          <div className="admin__col-6">
            <div className="admin__item-sm">
              <Chart title={dataSet[0].title} data={dataSet[0].data} />
            </div>
            <div className="admin__item-sm">
              <Chart title={dataSet[1].title} data={dataSet[1].data} />
            </div>
            <div className="admin__item-sm">
              <Chart title={dataSet[2].title} data={dataSet[2].data} />
            </div>
            <div className="admin__item-sm">
              <Chart title={dataSet[3].title} data={dataSet[3].data} />
            </div>
          </div>
          <div className="admin__col-4">
            <div className="admin__item-lg">
              <Chart title={dataSet[4].title} data={dataSet[4].data} />
              <Chart title={dataSet[5].title} data={dataSet[5].data} />
            </div>
          </div>
        </div>
        <div className="admin__row">
          <div className="admin__col-6">
            <div className="admin__item-lg">
              <h1 className="admin__title">PRODUCT</h1>
              <TableProduct props={productData} />
            </div>
          </div>
          <div className="admin__col-4">
            <div className="admin__item-lg">
              <h1 className="admin__title">USER</h1>
              <TableCustomer props={customerData} />
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
              <h1 className="admin__title">USER</h1>
              <TableCustomer props={customerData} />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   Admin Message:
    //   <p>{user.result[0].user}</p>
    //   <p>{authText}</p>
    // </div>
  );
}

export default Admin;
