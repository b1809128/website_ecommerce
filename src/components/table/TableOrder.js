import "./table.css";
import "../header/header.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function TableOrder() {
  const [idOrder, setIdOrder] = useState(0);

  //Search
  const [tagName, setTagName] = useState("");
  const [searchData, setSearchData] = useState([]);

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/manage/order/delete/${id}`);
      setIdOrder(0);
    } catch (error) {
      console.log(error);
    }
  };

  //Auto load after delete order by id
  useEffect(() => {
    const delOrder = (idOrder) => {
      if (idOrder > 0) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteOrder(idOrder);
            Swal.fire("Deleted!", `${idOrder} has been deleted.`, "success");
          }
        });
      }
    };

    const searchOrder = async () => {
      try {
        if (tagName) {
          const res = await axios.get(
            `http://localhost:5000/manage/table/order/search?q=${tagName}`
          );
          setSearchData(res.data);
        } else {
          const res = await axios.get(
            `http://localhost:5000/manage/table/order/search`
          );
          setSearchData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchOrder();
    delOrder(idOrder);
  }, [idOrder, tagName]);

  return (
    <>
      <form className="nav-bar__form">
        <input
          type="text"
          className="nav-bar__form-input-admin"
          placeholder="Search"
          name="search"
          onChange={(e) => setTagName(e.target.value)}
        />
      </form>
      <table className="table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Order</th>
            <th>User</th>
            <th>Staff</th>
            <th>Created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((data, index) => {
            // console.log(JSON.parse(data.status))
            return (
              <>
                <tr>
                  <td style={{ textAlign: "center" }}>{data.id_order}</td>
                  <td>{data.id}</td>
                  <td>{data.id_staff}</td>
                  <td style={{ textAlign: "left", fontWeight: "700" }}>
                    {new Date(data.created_at).toDateString()}
                  </td>
                  <td>{data.status}</td>
                  <td
                    style={{
                      textAlign: "center",
                      fontSize: "1.4rem",
                      display: "flex",
                      margin: "10px 0",
                    }}
                  >
                    <Link
                      to={{
                        pathname: "/quan-ly-don-hang",
                        search: `?id_order=${data.id_order}&id=${data.id}`,
                      }}
                    >
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
