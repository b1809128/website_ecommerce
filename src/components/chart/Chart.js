import React from "react";
import "./chart.css";

export default function Chart({ title, data }) {
  return (
    <div className="chart">
      <h1 className="admin__title">{title}</h1>
      <img src={data} alt="chart" className="chart__image"/>
    </div>
  );
}
