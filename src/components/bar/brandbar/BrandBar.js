import "./brandbar.css";
import "./tagsbar.css";
import { FaMobileAlt, FaHeadphonesAlt, FaLaptop } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function BrandBar() {
  return (
    <div className="tags-bar">
      <ul className="brand-bar-list">
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?brand=AP"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <FaMobileAlt className="tag__bar-icon" /> Apple
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?brand=SS"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <FaMobileAlt className="tag__bar-icon" /> Samsung
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?brand=AS"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <FaMobileAlt className="tag__bar-icon" /> Asus
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?brand=OP"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <FaMobileAlt className="tag__bar-icon" /> Oppo
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?brand=SN"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <FaHeadphonesAlt className="tag__bar-icon" /> Sony
          </Link>
        </li>
        <li className="tag__bar-item">
          <Link
            to="/tat-ca-san-pham?brand=DL"
            className="link"
            style={{ width: "100%", height: "100%", justifyContent: "center" }}
          >
            <FaLaptop className="tag__bar-icon" /> DELL
          </Link>
        </li>
      </ul>
    </div>
  );
}
