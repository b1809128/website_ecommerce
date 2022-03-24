import "./brandbar.css";
import { FaMobileAlt, FaHeadphonesAlt, FaLaptop, FaUsb } from "react-icons/fa";
import { MdWatch } from "react-icons/md";
import { Link } from "react-router-dom";
export default function BrandBar() {
  return (
    <div className="brand-bar">
      <ul className="brand-bar-list">
        <li className="brand-bar-item">
          <FaMobileAlt className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?brand=AP" className="link">
            Apple
          </Link>
        </li>
        <li className="brand-bar-item">
          <FaMobileAlt className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?brand=SS" className="link">
            Samsung
          </Link>
        </li>
        <li className="brand-bar-item">
          <FaMobileAlt className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?brand=AS" className="link">
            Asus
          </Link>
        </li>
        <li className="brand-bar-item">
          <FaMobileAlt className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?brand=OP" className="link">
            OPPO
          </Link>
        </li>
        <li className="brand-bar-item">
          <FaHeadphonesAlt className="brand-bar-icon" /> Apple
        </li>
        <li className="brand-bar-item">
          <FaHeadphonesAlt className="brand-bar-icon" /> Sony
        </li>
        <li className="brand-bar-item">
          <FaHeadphonesAlt className="brand-bar-icon" /> Samsung
        </li>
        <li className="brand-bar-item">
          <MdWatch className="brand-bar-icon" /> Apple
        </li>
        <li className="brand-bar-item">
          <MdWatch className="brand-bar-icon" /> Samsung
        </li>
        <li className="brand-bar-item">
          <FaLaptop className="brand-bar-icon" /> Apple
        </li>
        <li className="brand-bar-item">
          <FaLaptop className="brand-bar-icon" /> Dell
        </li>
        <li className="brand-bar-item">
          <FaLaptop className="brand-bar-icon" /> HP
        </li>
        <li className="brand-bar-item">
          <FaLaptop className="brand-bar-icon" /> MSI
        </li>
        <li className="brand-bar-item">
          <FaUsb className="brand-bar-icon" /> Kingston
        </li>
      </ul>
    </div>
  );
}
