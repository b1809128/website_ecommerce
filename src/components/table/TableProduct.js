import React from "react";
import "./table.css";
function TableProduct({ props }) {
  //Map image in array choose image[0]
  const imageMain = props.map((data) => JSON.parse(data.PATH));

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>STT</th>
            <th>Id Product</th>
            <th>Name</th>
            <th>Images</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.map((data, index) => {
            var i = index;
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>{(index += 1)}</td>
                  <td>{data.MSHH}</td>
                  <td>{data.TenHH}</td>
                  <td>
                    <img
                      src={imageMain[i][0]}
                      alt="product"
                      className="table__image"
                    />
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "700" }}>
                    {data.SoLuongHang}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {new Intl.NumberFormat().format(data.Gia)} VND
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

export default TableProduct;
