import React from "react";
import { Link } from "react-router-dom";
import "./pagination.css";
import PaginationComponents from "./PaginationComponents";
export default function Paganition({ props, page }) {
  return (
    <div className="pagination-wrapper">
      <div className={!page ? "pagination-item active" : "pagination-item"}>
        <Link
          to={{
            pathname: "/details",
          }}
          className={!page ? "pagination-link-active" : "pagination-link"}
        >
          1
        </Link>
      </div>
      <PaginationComponents idxNumber={props} pageNumber={page} />
    </div>
  );
}
