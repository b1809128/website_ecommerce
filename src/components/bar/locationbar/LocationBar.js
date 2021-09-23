import "./locationbar.css";
import {FaAngleRight} from "react-icons/fa";
export default function LocationBar(){
    const location = window.location.pathname.split("/");
    return(
        <div className="location-bar">
            <ul className="location-bar-list">
                <li className="location-bar-item">Home <FaAngleRight/></li>
                <li className="location-bar-item">{location}</li>
            </ul>
        </div>
    );
}