import React from "react";
import { FaBookmark, FaCartPlus, FaPen } from "react-icons/fa";
export default function ModalProduct({ id, addCart }) {
  return (
    <div className="product-image__modal">
      <ul className="product-image__modal-list">
        <li className="product-image__modal-list-item link">
          <FaBookmark />
        </li>
        <li className="product-image__modal-list-item link">
          <FaCartPlus onClick={() => addCart(id)} />
        </li>
        <li className="product-image__modal-list-item link">
          <FaPen />
        </li>
      </ul>
    </div>
  );
}
