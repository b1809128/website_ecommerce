import "./brandbar.css";
import { FaMobileAlt, FaHeadphonesAlt, FaLaptop } from "react-icons/fa";
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
            Oppo
          </Link>
        </li>
        <li className="brand-bar-item">
          <MdWatch className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?search=apple+watch" className="link">
            Apple
          </Link>
        </li>
        <li className="brand-bar-item">
          <MdWatch className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?search=galaxy+watch" className="link">
            Samsung
          </Link>
        </li>
        <li className="brand-bar-item">
          <FaHeadphonesAlt className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?search=sony" className="link">
            Sony
          </Link>
        </li>
        <li className="brand-bar-item">
          <FaLaptop className="brand-bar-icon" />{" "}
          <Link to="/tat-ca-san-pham?brand=DL" className="link">
            DELL
          </Link>
        </li>
      </ul>
    </div>
  );
}
