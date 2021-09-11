import React, { useState } from "react";
import "./introduce.css";
import { introduceData } from "./introduceData";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
export default function Introduce({ data }) {
  const [current, setCurrent] = useState(0);
  const length = data.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // setInterval(nextSlide,10000)

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }
  return (
    <div id="services" className="introduce-wrapper">
      <FaAngleLeft className="push-left" onClick={prevSlide} />
      <FaAngleRight className="push-right" onClick={nextSlide} />
      <img
        src="./images/slide_5.jpg"
        alt="Slide introduce"
        className="introduce-image"
      />
      {introduceData.map((data, index) => {
        return (
          <div
            className={
              index === current ? "introduce-company introduce-company__active" : "introduce-company"
            }
            key={index}
          >
            {index === current && (
              <img
                src={data.image}
                alt="Logo"
                className="introduce-company__logo"
              />
            )}

            {index === current && (
              <div className="introduce-company__text">
                <p>{data.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
