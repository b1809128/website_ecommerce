import React from "react";
import "./table.css";
function TableCustomer({ props }) {
  // console.log(props);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>STT</th>
            <th>UserName</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {props.map((data, index) => {
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>{(index += 1)}</td>
                  <td>{data.user}</td>
                  <td>{data.role}</td>
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
