import "./introducetop.css";
import { FaAngleRight } from "react-icons/fa";
export default function IntroduceTop() {
  return (
    <div className="introduce-top-wrapper">
      <img
        src="./images/introduce_top_1.jpg"
        alt="Slide introduce"
        className="introduce-top-image"
      />
      <div className="introduce-top-text">
        <h1 className="introduce-top-text__title">Why Apple is the best place to buy iPhone.</h1>
        <h3 className="introduce-top-text__justify">
          You can choose a payment option that works for you, pay less with a
          trade‑in, connect your new iPhone to your carrier, and get set up
          quickly. You can also chat with a Specialist anytime.
        </h3>
        <div className="introduce-top-text__link">Learn More <FaAngleRight className="introduce-top-text__icon"/></div>
      </div>
    </div>
  );
}
