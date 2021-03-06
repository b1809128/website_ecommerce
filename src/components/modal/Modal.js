import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import "./modal.css";
export default function Modal({ closeModal, status, children }) {
  const showHideClassName = status
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <TiDeleteOutline onClick={closeModal} className="exit-icon" />
        {children}
      </section>
    </div>
  );
}
