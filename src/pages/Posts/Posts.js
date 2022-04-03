/* eslint-disable jsx-a11y/alt-text */
import "./posts.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PostData } from "./PostData";
import LocationBar from "../../components/bar/locationbar/LocationBar";
import Pagination from "../../components/bar/pagination/Pagination";

export default function Posts() {
  const postNearest = PostData.filter((data, index) => index < 5);
  const query = new URLSearchParams(useLocation().search);
  const pageQuery = query.get("page");
  const idPost = query.get("idPost");
  const [posts, setPosts] = useState([]);
  const [postDetails, setPostDetails] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = () => {
      if (pageQuery) {
        const test = testPage(6, PostData);
        setPosts(test[parseInt(pageQuery) - 1]);
      }
      if (idPost) {
        const postFilterData = PostData.filter(
          (data) => data.id === parseInt(idPost)
        );
        setPostDetails(postFilterData);
      } else {
        const paginationBefore = PostData.filter((data, idx) => {
          return idx < 6;
        });
        setPosts(paginationBefore);
      }
    };

    fetch();
  }, [idPost, pageQuery]);

  const testPage = (numberPerPage, productData) => {
    let array = [];
    var length = productData.length;
    var myChunk;
    for (let i = 0; i < length; i += numberPerPage) {
      myChunk = productData.slice(i, i + numberPerPage);
      array.push(myChunk);
    }
    return array.map((data) => data);
  };

  return (
    <div className="posts">
      <div className="posts-section">
        <div className="posts__row">
          <LocationBar />
          <div className="row">
            {idPost ? (
              <div className="post__col-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: postDetails.map((data) => data.content),
                  }}
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: "Open Sans, arial, sans-serif",
                  }}
                />
              </div>
            ) : (
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
                {posts.map((data) => {
                  return (
                    <div className="post__wrapper">
                      <img className="post__image" src={data.image} />
                      <div className="post__content">
                        <Link
                          to={`/tin-cong-nghe?idPost=${data.id}`}
                          className="link"
                        >
                          <h3 className="post__title" title={data.title}>
                            {data.title}
                          </h3>
                        </Link>
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
            )}

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
          {idPost ? (
            <div className="row" style={{ display: "none" }}>
              <Pagination
                props={Math.ceil(PostData.length / 6)}
                page={parseInt(pageQuery)}
                urlPage="/tin-cong-nghe"
              />
            </div>
          ) : (
            <div className="row">
              <Pagination
                props={Math.ceil(PostData.length / 6)}
                page={parseInt(pageQuery)}
                urlPage="/tin-cong-nghe"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
