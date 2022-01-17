// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./table.css";
function TableOrder({ props }) {
  // const [idOrder, setIdOrder] = useState(0);
  // console.log(idOrder);
  // useEffect(() => {
  //   const delOrder = async () => {
  //     try {
  //       const result = await axios.delete(
  //         `http://localhost:5000/manage/order/delete/${idOrder}`
  //       );
  //       console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (idOrder > 0) {
  //     delOrder();
  //   }
  // });
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
          {props.map((data, index) => {
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
                    <FaEdit
                      style={{
                        color: "#28a745",
                      }}
                    />
                    <MdDeleteForever
                      style={{
                        color: "#eb0028",
                      }}
                      // onClick={() => setIdOrder(data.id_order)}
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
