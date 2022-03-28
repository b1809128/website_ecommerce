/* eslint-disable jsx-a11y/alt-text */
import "./posts.css";
import React from "react";
import { PostData } from "./PostData";
import LocationBar from "../../components/bar/locationbar/LocationBar";

export default function Posts() {
  const postNearest = PostData.filter((data, index) => index < 5);
  return (
    <div className="posts">
      <div className="posts-section">
        <div className="posts__row">
          <LocationBar />
          <div className="row">
            <div className="post__col-lg">
              <div className="post__wrapper">
                <div className="post__wrapper-header">
                  <img
                    className="post__image-header"
                    src="/images/tincongnghe/14.png"
                  />
                  <h3 className="post__title-header">
                    Top 5 điện thoại đôi dành cho fan Samsung
                  </h3>
                </div>
                <div className="post__wrapper-header">
                  <img
                    className="post__image-header"
                    src="/images/tincongnghe/13.png"
                  />
                  <h3 className="post__title-header">
                    iPad Pro 2021 ra mắt: chip M1 siêu mạnh, màn hình mini-LED
                    mới, giá chỉ từ 18.4 triệu
                  </h3>
                </div>
              </div>
              {PostData.map((data) => {
                return (
                  <div className="post__wrapper">
                    <img className="post__image" src={data.image} />
                    <div className="post__content">
                      <h3 className="post__title" title={data.title}>
                        {data.title}
                      </h3>
                      <div className="post__tag-wrapper">
                        <button className="post__tag">{data.tags}</button>
                        <p className="post__date">{data.date}</p>
                      </div>
                      <p className="post__text">{data.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="post__col-sm">
              <h2 className="title__tag">BÀI VIẾT GẦN ĐÂY</h2>
              {postNearest.map((data) => {
                return (
                  <div className="post__wrapper-right">
                    <img className="post__image-right" src={data.image} />
                    <div className="post__content">
                      <h3 className="post__title-right" title={data.title}>
                        {data.title}
                      </h3>
                      <div className="post__tag-wrapper">
                        <button className="post__tag">{data.tags}</button>
                        <p className="post__date">{data.date}</p>
                      </div>
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
