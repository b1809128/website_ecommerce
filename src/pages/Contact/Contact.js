import React, { useEffect } from "react";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../CheckOut/checkout.css";
import "./contact.css";
export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="check">
      <div className="check-section">
        <div className="check__row">
          <LocationBar />
          <div className="row">
            <div className="check__form">
              <div className="order__information">
                <h2 className="check__form-title">
                  LIÊN HỆ VỚI CHÚNG TÔI QUA EMAIL
                </h2>
                <form className="form-section">
                  <div className="form-block">
                    <label for="name">Họ tên*</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Full name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-block">
                    <label for="email">Email*</label>
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      placeholder="expample@gmail.com"
                    />
                  </div>

                  <div className="form-block">
                    <label for="adress">Công ty*</label>
                    <input
                      className="form-input"
                      type="text"
                      id="adress"
                      placeholder="Street Address"
                    />
                  </div>

                  <div className="form-block">
                    <label for="phone">Số điện thoại*</label>
                    <input type="text" id="phone" className="form-input" />
                  </div>

                  <div className="form-block">
                    <label for="notes">Ghi chú</label>
                    <textarea id="notes"></textarea>
                  </div>
                  <div className="form-block">
                    <button className="btn">Gửi</button>
                  </div>
                </form>
              </div>
            </div>
            {/* Check method */}
            <div className="check__method">
              <div className="contact-wrapper">
                <div className="contact-item">
                  <h2 className="contact-title">TRỤ SỞ CHÍNH CẦN THƠ</h2>
                  <p className="contact-address">
                    <span style={{ fontWeight: "700" }}>
                      Văn phòng đại diện:
                    </span>{" "}
                    06 Đại lộ Hòa Bình, Quận Ninh Kiều, Thành phố Cần Thơ
                  </p>
                  <p className="contact-address">
                    <span style={{ fontWeight: "700" }}>
                      Chi nhánh bán hàng:
                    </span>{" "}
                    08 Đại lộ Hòa Bình, Quận Ninh Kiều, Thành phố Cần Thơ
                  </p>
                  <p className="contact-address">
                    <span style={{ fontWeight: "700" }}>
                      Công ty giải pháp phần mềm:
                    </span>{" "}
                    08 Đại lộ Hòa Bình, Quận Ninh Kiều, Thành phố Cần Thơ
                  </p>
                  <span className="contact-phone">
                    0937.790.999 - 0904.39.3232
                  </span>
                </div>
                <div className="contact-item">
                  <h2 className="contact-title">CHI NHÁNH HỒ CHÍ MINH</h2>

                  <p className="contact-address">
                    <span style={{ fontWeight: "700" }}>
                      Công ty giải pháp phần mềm:
                    </span>{" "}
                    08 Nguyễn Chí Thanh, Quận 1, Thành phố Hồ Chí Minh
                  </p>
                  <span className="contact-phone">
                    0937.790.999 - 0904.39.3232
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
