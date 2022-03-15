import React from "react";
import { Link } from "react-router-dom";
export default function PaginationComponents({ idxNumber, pageNumber }) {
  // console.log(pageNumber);
  const test = (data) => {
    let array = [];
    for (let i = 2; i <= data; i++) {
      array.push(i);
    }
    return array;
  };
  return test(idxNumber).map((data) => {
    return (
      <div
        className={
          pageNumber === data ? "pagination-item active" : "pagination-item"
        }
      >
        <Link
          to={{
            pathname: "/details",
            search: `?page=${data}`,
          }}
          className={
            pageNumber === data ? "pagination-link-active" : "pagination-link"
          }
        >
          {data}
        </Link>
      </div>
    );
  });
}
