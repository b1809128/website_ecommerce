import React, { useEffect} from "react";
import Modal from "../../components/modal/Modal";
import AdminEdit from "../Edit/AdminEdit";

export default function Test() {

  useEffect(() => {console.log(localStorage.getItem("clickStatus"))},[])

  const showModal = () => {
    localStorage.setItem("clickStatus", true);
  };

  const closeModal = () => {
    localStorage.setItem("clickStatus", false);
  };

  // const test = localStorage.getItem("clickStatus");
  return (
    <>
      <button className="btn" onClick={showModal}>
        Open
      </button>{" "}
      <button className="btn" onClick={closeModal}>
        Close
      </button>
      <Modal status={false} children={<AdminEdit />} />
    </>
  );
}
