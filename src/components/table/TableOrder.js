import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./table.css";
import { Link } from "react-router-dom";
function TableOrder() {
  const [dataProps, setDataProps] = useState([]);
  const [idOrder, setIdOrder] = useState(0);

  // console.log(idOrder);
  useEffect(() => {
    const delOrder = async (idOrder) => {
      if (idOrder === 0) {
        let res = await axios.get("http://localhost:5000/manage/order");
        setDataProps(res.data);
      } else if (idOrder > 0) {
        try {
          await axios.delete(
            `http://localhost:5000/manage/order/delete/${idOrder}`
          );
          setIdOrder(0);
        } catch (error) {}
      }
    };
    delOrder(idOrder);
  });

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Order</th>
            <th>User</th>
            <th>Staff</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataProps.map((data, index) => {
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>{data.id_order}</td>
                  <td>{data.id}</td>
                  <td>{data.id_staff}</td>
                  <td style={{ textAlign: "left", fontWeight: "700" }}>
                    {new Date(data.created_at).toDateString()}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontSize: "1.4rem",
                      display: "flex",
                      margin: "10px 0",
                    }}
                  >
                    <Link to="/edit">
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
                      onClick={() => {
                        setIdOrder(data.id_order);
                      }}
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

export default TableOrder;
