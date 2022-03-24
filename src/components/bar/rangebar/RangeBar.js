import "./rangebar.css";
import { FaSort, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RangeBar({ data }) {
  const values = [
    "Tất cả",
    "Giá tăng dần",
    "Giá giảm dần",
    "Tên A-Z",
    "Tên Z-A",
  ];
  //Choose the value
  var name = values[0];
  if (data === "PRICE_ASC") {
    name = values[1];
  } else if (data === "PRICE_DESC") {
    name = values[2];
  } else if (data === "NAME_ASC") {
    name = values[3];
  } else if (data === "NAME_DESC") {
    name = values[4];
  }
  return (
    <div className="range-bar">
      <div className="range-bar-container">
        <form action="/tat-ca-san-pham" method="get" className="range-bar__form">
          <input
            type="text"
            className="range-bar__form-input"
            placeholder="Tìm kiếm"
            name="search"
          />
          <button className="range-bar__form-submit" type="submit">
            <FaSearch className="range-bar-icon" />
          </button>
        </form>

        <ul className="range-bar-text-list">
          <li className="range-bar-text-item">
            <div className="range-bar__select" name="sort">
              {name}
              <div className="range-bar__select-children">
                <div id="ASC" value="">
                  <Link to="/tat-ca-san-pham" className="link">
                    Tất cả
                  </Link>
                </div>
                <div id="ASC" value="Gia tang dan">
                  <Link to="?sortBy=PRICE_ASC" className="link">
                    Giá tăng dần
                  </Link>
                </div>
                <div id="PRICE_DESC" value="Gia giam dan">
                  <Link to="?sortBy=PRICE_DESC" className="link">
                    Giá giảm dần
                  </Link>
                </div>
                <div id="NAME_ASC" value="Ten a-z">
                  <Link to="?sortBy=NAME_ASC" className="link">
                    Tên A-Z
                  </Link>
                </div>
                <div id="NAME_DESC" value="Ten z-a">
                  <Link to="?sortBy=NAME_DESC" className="link">
                    Tên Z-A
                  </Link>
                </div>
              </div>
            </div>{" "}
            <FaSort className="range-bar-icon" />
          </li>
        </ul>
      </div>
    </div>
  );
}
