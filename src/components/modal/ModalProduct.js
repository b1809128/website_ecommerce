import React, { useState } from "react";
import { FaBookmark, FaCartPlus, FaPen } from "react-icons/fa";

export default function ModalProduct() {
  const [cartNumber, setCartNumber] = useState(
    parseInt(localStorage.getItem("cartNumber") | 0)
  );
  const updateCart = () => {
    let count = cartNumber;
    setCartNumber(count + 1);
    localStorage.setItem("cartNumber", cartNumber);
  };
  const removeCart = () => {
    localStorage.setItem("cartNumber", 0);
  };
  return (
    <div className="product-image__modal">
      <ul className="product-image__modal-list">
        <li className="product-image__modal-list-item link">
          <FaBookmark onClick={removeCart} />
        </li>
        <li className="product-image__modal-list-item link">
          <FaCartPlus onClick={updateCart} />
        </li>
        <li className="product-image__modal-list-item link">
          <FaPen />
        </li>
      </ul>
    </div>
  );
}
