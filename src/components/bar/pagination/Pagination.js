import React from "react";
import { Link } from "react-router-dom";
import "./pagination.css";
import PaginationComponents from "./PaginationComponents";
export default function Paganition({ props }) {
  return (
    <div className="pagination-wrapper">
      <div className="pagination-item">
        <Link
          to={{
            pathname: "/details",
          }}
          className="pagination-link"
        >
          1
        </Link>
      </div>
      <PaginationComponents idxNumber={props} />
    </div>
  );
}
