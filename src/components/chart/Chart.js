import React from "react";
import "./chart.css";

export default function Chart({ title, color, data }) {
  return (
    <div className="chart">
      <h1 className="chart__title" style={{ color: color }}>
        {title}
      </h1>
      <img src={data} alt="chart" className="chart__image" />
    </div>
  );
}
