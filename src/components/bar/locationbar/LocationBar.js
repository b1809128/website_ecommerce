import "./locationbar.css";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function LocationBar() {
  //Spit / URL and get location
  const location = window.location.pathname.split("/");
  return (
    <div className="location-bar">
      <ul className="location-bar-list">
        <li className="location-bar-item">
          <Link to="/" className="location-bar-item__link">
            Home
          </Link>{" "}
          <FaAngleRight />
        </li>
        <li className="location-bar-item">
          <Link to={location[1]} className="location-bar-item__link">
            {location[1]}
          </Link>
        </li>
        <li className="location-bar-item">
          <FaAngleRight />
        </li>
        <li className="location-bar-item">
          <Link to={location[2]} className="location-bar-item__link">
            {location[2]}
          </Link>
        </li>
      </ul>
    </div>
  );
}
