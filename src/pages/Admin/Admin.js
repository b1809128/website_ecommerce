import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import TableCustomer from "../../components/table/TableCustomer"
import "./Admin.css";
function Admin() {
  const { user } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(true);
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.post("http://localhost:5000/auth/admin", {
        token: user.token,
      });
      //   console.log(res);
      if (res.data.logged) {
        setAuthorized(true);
        // setAuthText(res.data.message);
      } else {
        setAuthorized(false);
        // setAuthText(res.data.message);
      }
      const res2 = await axios.get("http://localhost:5000/manage/customer")
      setCustomerData(res2.data)
    };
    fetch();
  }, [user.token]);
  // console.log(user);
  if (!authorized) {
    // alert("You are not authorized !");
    return <Redirect to="/sign-in" />;
  }
  // console.log(customerData)
  return (
    <div className="admin">
      <div className="admin-section">
        <div className="admin__row">
          <div className="admin__col-6">
            <div className="admin__item-sm">Hello</div>
            <div className="admin__item-sm">Hello</div>
            <div className="admin__item-sm">Hello</div>
            <div className="admin__item-sm">Hello</div>
          </div>

          <div className="admin__col-4">
            <div className="admin__item-lg">Hello</div>
          </div>
        </div>
        <div className="admin__row">
          <div className="admin__col-6">
            <div className="admin__item-lg">
              <h1>PRODUCT</h1>
              
            </div>
          </div>
          <div className="admin__col-4">
            <div className="admin__item-lg">
              <h1>USER</h1>
              <TableCustomer props={customerData}/>
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
