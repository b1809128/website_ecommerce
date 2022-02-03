import "./table.css";
import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
function TableCustomer() {
  const [idCustomers, setIdCustomer] = useState(0);
  const [dataProps, setDataProps] = useState([]);

  //Auto load after delete customer by id
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
                    <FaEdit
                      style={{
                        color: "#28a745",
                      }}
                    />
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
