import { FaAngleDown } from "react-icons/fa";
import "./rangebar.css";

export default function RangeBar(){
    return (
        <div className="range-bar">
            <div className="range-bar-text">
                <ul className="range-bar-text-list">
                    <li className="range-bar-text-item">List Filter:</li>
                    <li className="range-bar-text-item">List <FaAngleDown className="range-bar-icon"/></li>
                    <li className="range-bar-text-item ">Price <FaAngleDown className="range-bar-icon "/></li>
                </ul>
                <ul className="range-bar-text-list">
                <li className="range-bar-text-item"></li>                   
                    <li className="range-bar-text-item">Sort <FaAngleDown className="range-bar-icon"/></li>
                </ul>  
            </div>
        </div>
    );
}