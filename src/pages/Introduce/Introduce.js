import React from "react";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Posts/posts.css";
import "./introduce.css";
import { IntroData } from "./IntroData";

export default function Introduce() {
  return (
    <div className="posts">
      <div className="posts-section">
        <div className="posts__row">
          <LocationBar />
          <div className="row">
            <div className="post__col-lg">
              <h2>Giới thiệu Rabbit Technology</h2>
              <h3>Giới thiệu chung</h3>
              Với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế giao diện web
              và công nghệ website trên mọi lĩnh vực công nghệ thông tin. Công
              ty Giải pháp Phần mềm Rabbit Technology sẽ mang đến cho bạn dịch
              vụ tốt nhất với các sản phẩm quốc tế cũng như trong nước với chất
              lượng và sự phục vụ nhiệt tình nhất. Xin thay mặt công ty Rabbit
              Technology cảm ơn các bạn đã tin tưởng sử dụng dịch vụ.{" "}
              <h4>CEO Rabbit Technology !</h4>
              <h4>CEO và Founder: Nguyễn Hồ Quốc Huy</h4>
              <h4>Email: nghoquochuy0902@gmail.com</h4>
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
