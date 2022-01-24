import React, { useState, useEffect } from "react";
import "./table.css";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
function TableCustomer() {
  // console.log(props);
  const [idCustomers, setIdCustomer] = useState(0);
  const [dataProps, setDataProps] = useState([]);
  useEffect(() => {
    const delCustomer = async (idCustomers) => {
      if (idCustomers === 0) {
        let res = await axios.get("http://localhost:5000/manage/customer");
        setDataProps(res.data);
      } else if (idCustomers > 0) {
        try {
          await axios.delete(
            `http://localhost:5000/manage/customer/delete/${idCustomers}`
          );
          setIdCustomer(0);
        } catch (error) {}
      }
    };
    delCustomer(idCustomers);
  });

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>STT</th>
            <th>UserName</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataProps.map((data, index) => {
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>{(index += 1)}</td>
                  <td>{data.user}</td>
                  <td>{data.role}</td>
                  <td
                    style={{
                      textAlign: "center",
                      fontSize: "1.4rem",
                      display: "flex",
                      margin: "10px 0",
                    }}
                  >
                    <Link to="/admin-edit">
                      <FaEdit
                        style={{
                          color: "#28a745",
                        }}
                      />
                    </Link>
                    <MdDeleteForever
                      style={{
                        color: "#eb0028",
                      }}
                      onClick={() => setIdCustomer(data.id)}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableCustomer;
