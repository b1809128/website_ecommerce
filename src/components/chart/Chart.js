import React from "react";
import { BsArrowUp } from "react-icons/bs";
import "./chart.css";

export default function Chart({ title, color, data, number }) {
  return (
    <div className="chart">
      <h1 className="chart__title" style={{ color: color }}>
        {title}
      </h1>
      <h1 className="chart__number" style={{ color: color }}>
        {new Intl.NumberFormat().format(number)} - <BsArrowUp />
        {number > 1000000
          ? new Intl.NumberFormat().format(
              number /100000000 * 0.1 + Math.floor(Math.random() * 10)
            )
          : new Intl.NumberFormat().format(
              number * 0.1 + Math.floor(Math.random() * 10)
            )}
        %
      </h1>
      <img src={data} alt="chart" className="chart__image" />
    </div>
  );
}
