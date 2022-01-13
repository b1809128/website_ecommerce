import React from "react";
import "./table.css";
function TableCustomer({ props }) {
  console.log(props);

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
          {props.map((data, index) => {
            return (
              <>
                <tr>
                  <td>{(index += 1)}</td>
                  <td>{data.user}</td>
                  <td>{data.password}</td>
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
