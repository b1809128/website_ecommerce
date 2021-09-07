import "./brandbar.css";
import { FaMobileAlt, FaHeadphonesAlt } from "react-icons/fa";
import {MdWatch} from "react-icons/md";
export default function BrandBar(){
    return(
        <div className="brand-bar">
            <ul className="brand-bar-list">
                <li className="brand-bar-item"><FaMobileAlt className="brand-bar-icon"/> Apple</li>
                <li className="brand-bar-item"><FaMobileAlt className="brand-bar-icon"/> Samsung</li>
                <li className="brand-bar-item"><FaMobileAlt className="brand-bar-icon"/> BlackBerry</li>
                <li className="brand-bar-item"><FaMobileAlt className="brand-bar-icon"/> Sony</li>
                <li className="brand-bar-item"><FaHeadphonesAlt className="brand-bar-icon"/> Apple</li>
                <li className="brand-bar-item"><FaHeadphonesAlt className="brand-bar-icon"/> Sony</li>
                <li className="brand-bar-item"><FaHeadphonesAlt className="brand-bar-icon"/> Samsung</li>
                <li className="brand-bar-item"><MdWatch className="brand-bar-icon"/> Apple</li>
                <li className="brand-bar-item"><MdWatch className="brand-bar-icon"/> Samsung</li>
            </ul>
        </div>
    );
}