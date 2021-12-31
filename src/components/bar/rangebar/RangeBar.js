import { FaSort, FaSearch } from "react-icons/fa";
import "./rangebar.css";

export default function RangeBar() {
  return (
    <div className="range-bar">
      <div className="range-bar-container">
        <form className="range-bar__form">
          <input
            type="text"
            className="range-bar__form-input"
            placeholder="Search"
            name="search"
          />
          <button className="range-bar__form-submit" type="submit">
            <FaSearch className="range-bar-icon" />
          </button>
        </form>

        <ul className="range-bar-text-list">
          <li className="range-bar-text-item">
            <select className="range-bar__select" name="sort">
              <option value="128">Mới nhất</option>
              <option value="128">Giá tăng dần</option>
              <option value="256">Giá giảm dần</option>
              <option value="512">Tên A-Z</option>
              <option value="512">Tên Z-A</option>
            </select>{" "}
            <FaSort className="range-bar-icon" />
          </li>
        </ul>
      </div>
    </div>
  );
}
