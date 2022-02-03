import React, { useState } from "react";
import { ReactModal } from "react-modal";
export default function Modal({ status }) {
  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };

  return (
    <div>
      <ReactModal isOpen={show}>
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
}
