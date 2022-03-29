import "./introducetop.css";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function IntroduceTop() {
  return (
    <div className="introduce-top-wrapper">
      <img
        src="./images/introduce_top_1.jpg"
        alt="Slide introduce"
        className="introduce-top-image"
      />
      <div className="introduce-top-text">
        <h1 className="introduce-top-text__title">
          Tại sao Apple lại là hãng điện thoại đáng mua nhất hiện nay ?
        </h1>
        <h3 className="introduce-top-text__justify">
          Bạn có thể chọn một tùy chọn thanh toán phù hợp với mình, trả ít hơn
          với giao dịch, kết nối iPhone mới với nhà cung cấp dịch vụ của bạn và
          thiết lập Mau. Bạn cũng có thể trò chuyện với Chuyên gia bất cứ lúc
          nào.
        </h3>
        <div className="introduce-top-text__link">
          <Link to="/tin-cong-nghe" className="introduce-top-text__link">
            Tìm hiểu thêm <FaAngleRight className="introduce-top-text__icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
