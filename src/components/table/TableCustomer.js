import React from "react";
import "./table.css";
function TableCustomer({ props }) {
  console.log(props.data);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>
          {/* {props.data.map((data) => {
            return (
              <>
                <tr>
                  <td>{data.id}</td>
                  <td>{data.user}</td>
                  <td>{data.password}</td>
                </tr>
              </>
            );
          })} */}
        </tbody>
      </table>
    </>
  );
}

export default TableCustomer;
