import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImArrowRight } from "react-icons/im";
export default function OrderStatus({ status }) {
  // console.log(status);
  if (status[0] === "Completed") {
    return (
      <>
        <div className="order-details__status-flex">
          <div className="circle-status">
            <FiCheck className="circle-status-icon" />
          </div>
          <div className="circle-status-none">
            <ImArrowRight className="circle-status-icon-arrow" />
          </div>
          <div className="circle-status">
            <FiCheck className="circle-status-icon" />
          </div>
          <div className="circle-status-none">
            <ImArrowRight className="circle-status-icon-arrow" />
          </div>
          <div className="circle-status">
            <FiCheck className="circle-status-icon" />
          </div>
          <div className="circle-status-none">
            <ImArrowRight className="circle-status-icon-arrow" />
          </div>
          <div className="circle-status">
            <FiCheck className="circle-status-icon" />
          </div>
        </div>
        <div className="order-details__status-flex">
          <p className="cart__total-item-text">Chờ xác nhận</p>
          <p className="cart__total-item-text">Đang xử lý</p>
          <p className="cart__total-item-text">Đang giao hàng</p>
          <p className="cart__total-item-text">Đã nhận hàng</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="order-details__status-flex">
        <div className="circle-status">
          <FiCheck className="circle-status-icon" />
        </div>
        <div className="circle-status-none">
          <ImArrowRight className="circle-status-icon-arrow" />
        </div>
        <div className="circle-status">
          <FiCheck className="circle-status-icon" />
        </div>
        <div className="circle-status-none">
          <ImArrowRight className="circle-status-icon-arrow" />
        </div>
        <div className="circle-status-not">
          <FiCheck className="circle-status-icon" />
        </div>
        <div className="circle-status-none">
          <ImArrowRight className="circle-status-icon-arrow" />
        </div>
        <div className="circle-status-not">
          <FiCheck className="circle-status-icon" />
        </div>
      </div>
      <div className="order-details__status-flex">
        <p className="cart__total-item-text">Chờ xác nhận</p>
        <p className="cart__total-item-text">Đang xử lý</p>
        <p className="cart__total-item-text">Đang giao hàng</p>
        <p className="cart__total-item-text">Đã nhận hàng</p>
      </div>
    </>
  );
}
