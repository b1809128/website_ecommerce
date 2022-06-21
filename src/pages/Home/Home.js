import "./home.css";
import "aos/dist/aos.css";
import Aos from "aos";
import React, { useEffect, useState } from "react";
import IntroduceTop from "../../components/main/introducetop/IntroduceTop";
import Info from "../../components/main/info/Info";
import {
  infoDataOne,
  infoDataTwo,
  infoDataThree,
  infoDataFour,
} from "../../components/main/info/infoData";
import BannerAdvertisement from "../../components/main/introduce/BannerAdvertisement";
import {
  introduceData,
  bannerDiscount,
} from "../../components/main/introduce/introduceData";
import Comment from "../../components/main/comment/Comment";
import axios from "axios";
import ProductAPI from "../../components/products/ProductAPI";
import { FaAngleRight } from "react-icons/fa";
import { PostData } from "../Posts/PostData";
import TagsBar from "../../components/bar/brandbar/TagsBar";

export default function Home({ addCart }) {
  const [product, setProduct] = useState([]);
  const [watchData, setWatchData] = useState([]);
  const [laptopData, setLaptopData] = useState([]);
  const [headphoneData, setHeadphoneData] = useState([]);
  const [tabletData, setTabletData] = useState([]);

  const commentData = PostData.filter((data, index) => index < 4);

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 2000,
    });

    const fetchAPI = async () => {
      try {
        const result = await axios.get("http://localhost:5000/product/all");
        setProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    const searchAPI = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/manage/table/product/search?q=watch`
        );
        const result2 = await axios.get(
          `http://localhost:5000/manage/table/product/search?q=laptop`
        );
        const result3 = await axios.get(
          `http://localhost:5000/manage/table/product/search?q=headphone`
        );
        const result4 = await axios.get(
          `http://localhost:5000/manage/table/product/search?q=tablet`
        );

        setWatchData(result.data);
        setLaptopData(result2.data);
        setHeadphoneData(result3.data);
        setTabletData(result4.data);
      } catch (error) {
        console.log(error);
      }
    };

    //Call function
    searchAPI();
    fetchAPI();
  }, []);

  //API Processor
  const dataAPI = product.filter(
    (data, index) =>
      data.MaLoaiHang === "AP" && data.Gia > 20000000 && data.Gia < 49000000
  );
  const dataAPIFilter10Products = dataAPI.filter((data, index) => index < 10);
  const dataAPI2 = product.filter((data, index) => data.Gia > 15000000);
  const dataAPIFilter15Products = dataAPI2.filter((data, index) => index <= 14);
  const dataAPI3 = watchData.map((data) => data);
  const dataAPIFilterWatch = dataAPI3.filter((data, index) => index < 5);
  const dataAPI4 = laptopData.map((data) => data);
  const dataAPIFilterLaptop = dataAPI4.filter((data, index) => index < 5);
  const dataAPI5 = headphoneData.map((data) => data);
  const dataAPIFilterHeadphone = dataAPI5.filter((data, index) => index < 5);
  const dataAPI6 = tabletData.map((data) => data);
  const dataAPIFilterTablet = dataAPI6.filter((data, index) => index < 5);
  return (
    <div className="home">
      <IntroduceTop />
      <div className="home-section">
        <div className="home__row">
          <div className="row">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {bannerDiscount.map((data, index) => {
                return (
                  <img className="banner-discount" src={data} alt={data} />
                );
              })}
            </div>
          </div>
          <TagsBar />

          <div id="categories" className="row">
            <Info {...infoDataOne} />
            <Info {...infoDataTwo} />
          </div>
          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              APPLE AUTHORISED RESELLER
            </h2>
          </div>
          <div data-aos="fade-up" className="row">
            <ProductAPI addCart={addCart} data={dataAPIFilter10Products} />
          </div>

          <div className="row">
            <Info {...infoDataThree} />
            <Info {...infoDataFour} />
          </div>
          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              SẢN PHẨM NỔI BẬT
            </h2>
          </div>
          <div data-aos="fade-up" className="row">
            <ProductAPI addCart={addCart} data={dataAPIFilter15Products} />
          </div>
          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              ĐỒNG HỒ THÔNG MINH
            </h2>
          </div>
          <div data-aos="fade-up" className="row">
            <ProductAPI addCart={addCart} data={dataAPIFilterWatch} />
          </div>
          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              TAI NGHE
            </h2>
          </div>
          <div data-aos="fade-up" className="row">
            <ProductAPI addCart={addCart} data={dataAPIFilterHeadphone} />
          </div>

          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              Tablet
            </h2>
          </div>
          <div data-aos="fade-up" className="row">
            <ProductAPI addCart={addCart} data={dataAPIFilterTablet} />
          </div>

          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              LAPTOP
            </h2>
          </div>
          <div data-aos="fade-up" className="row">
            <ProductAPI addCart={addCart} data={dataAPIFilterLaptop} />
          </div>

          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              RABBIT TECHNOLOGY
            </h2>
          </div>
          <BannerAdvertisement data={introduceData} />
          <div className="row">
            <h2 className="title__tag">
              <FaAngleRight />
              TIN CÔNG NGHỆ
            </h2>
          </div>
          <div data-aos="fade-up" id="blog" className="row">
            {commentData.map((data) => {
              return (
                <Comment
                  id={data.id}
                  image={data.image}
                  title={data.title}
                  date={data.date}
                  tags={data.tags}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
