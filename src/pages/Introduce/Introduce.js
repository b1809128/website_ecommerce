import LocationBar from "../../components/bar/locationbar/LocationBar";
import "../Posts/posts.css";
import "./introduce.css";
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
              <p style={{ lineHeight: "1.2rem", fontSize: "1.3rem" }}>
                Với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế giao diện web
                và công nghệ website trên mọi lĩnh vực công nghệ thông tin. Công
                ty Giải pháp Phần mềm Rabbit Technology sẽ mang đến cho bạn dịch
                vụ tốt nhất với các sản phẩm quốc tế cũng như trong nước với
                chất lượng và sự phục vụ nhiệt tình nhất. Xin thay mặt công ty
                Rabbit Technology cảm ơn các bạn đã tin tưởng sử dụng dịch vụ.
              </p>
              <h4>CEO Rabbit Technology !</h4>
              <br></br>
              <img
                src="https://scontent.fsgn12-1.fna.fbcdn.net/v/t1.6435-9/82850772_2583319361913449_3183193708392611840_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=1XFgoiosuN8AX9m0hDx&_nc_ht=scontent.fsgn12-1.fna&oh=00_AT8R_f51vC7g-gRNoUhoUJ3Jn7ClYDwqGwmOCHnSTSbVrg&oe=626A7E56"
                alt="imagetest"
                style={{
                  borderRadius:"8px",width:"300px",height:"300px",

                }}
              />
              <h4
                style={{
                  lineHeight: "1.2rem",
                  fontSize: "1.3rem",
                  color: "#eb0028",
                }}
              >
                CEO và Founder: Nguyễn Hồ Quốc Huy
              </h4>
              <h4 style={{ lineHeight: "1.2rem", fontSize: "1.3rem" }}>
                Email: nghoquochuy0902@gmail.com
              </h4>
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
