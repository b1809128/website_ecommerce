import React from "react";
import "./table.css";
function TableProduct({ props }) {
  //   console.log(props);
  const test = props.map((data) => JSON.parse(data.PATH));
  // console.log(test);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center"}}>STT</th>
            <th>ID PRODUCT</th>
            <th>NAME</th>
            <th>IMAGES</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {props.map((data, index) => {
            var i = index;
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center"}}>{(index += 1)}</td>
                  <td>{data.MSHH}</td>
                  <td>{data.TenHH}</td>
                  <td>
                    <img
                      src={test[i][0]}
                      alt="product"
                      className="table__image"
                    />
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "700" }}>
                    {data.SoLuongHang}
                  </td>
                  <td style={{ textAlign: "right"}}>{new Intl.NumberFormat().format(data.Gia)} VND</td>
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
