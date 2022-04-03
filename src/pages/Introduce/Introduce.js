import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Posts/posts.css";
import "./introduce.css";
import "../Contact/contact.css";
import { IntroData } from "./IntroData";
import React, { useEffect } from "react";

export default function Introduce() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="posts">
      <div className="posts-section">
        <div className="posts__row">
          <LocationBar />
          <div className="row">
            <div className="post__col-lg">
              <h1>Giới thiệu Rabbit Technology</h1>
              <p>
                Với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế giao diện web
                và công nghệ website trên mọi lĩnh vực công nghệ thông tin. Công
                ty Giải pháp Phần mềm Rabbit Technology sẽ mang đến cho bạn dịch
                vụ tốt nhất với các sản phẩm quốc tế cũng như trong nước với
                chất lượng và sự phục vụ nhiệt tình nhất. Xin thay mặt công ty
                Rabbit Technology cảm ơn các bạn đã tin tưởng sử dụng dịch vụ.
              </p>
              <h4 style={{ display: "flex", margin: "12px 0" }}>
                CEO Rabbit Technology !
              </h4>
              <hr />
              <div className="contact-wrapper" style={{ margin: "12px 0" }}>
                <div className="contact-item">
                  <h2 className="contact-title">CHI NHÁNH CẦN THƠ</h2>
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
            <div className="post__col-sm">
              <h2 className="title__tag">LĨNH VỰC PHÁT TRIỂN</h2>
              {IntroData.map((data) => {
                return (
                  <div className="post__wrapper-right">
                    <img
                      className="post__image-right"
                      src={data.image}
                      alt={data.tags}
                    />
                    <div className="post__content">
                      <h3 className="introduce__title-right" title={data.title}>
                        {data.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
