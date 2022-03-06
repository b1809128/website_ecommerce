import React from "react";
import { Link } from "react-router-dom";
import "./pagination.css";
export default function Paganition({props}) {
  console.log(props)
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
      <div className="pagination-item">
        <Link
          to={{
            pathname: "/details",
            search: `?page=2`,
          }}
          className="pagination-link"
        >
          2
        </Link>
      </div>
    </div>
  );
}
