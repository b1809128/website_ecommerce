import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <div>
        <h2>Slider Syncing (AsNavFor)</h2>
        <h4>First Slider</h4>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
        >
          <div>
            <img
              src="/images/products/product_1.jpg"
              alt="product color"
              className="product-details-image__right-item"
            />
          </div>
          <div>
          <img
              src="/images/products/product_2.jpg"
              alt="product color"
              className="product-details-image__right-item"
            />
          </div>
          <div>
          <img
              src="/images/products/product_3.jpg"
              alt="product color"
              className="product-details-image__righ-item"
            />
          </div>
          <div>
          <img
              src="/images/products/product_4.jpg"
              alt="product color"
              className="product-details-image__righ-item"
            />
          </div>
          
        </Slider>
        <h4>Second Slider</h4>
        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <img
              src="/images/products/product_1.jpg"
              alt="product color"
              className="product-details-image__left-item"
            />
          </div>
          <div>
          <img
              src="/images/products/product_2.jpg"
              alt="product color"
              className="product-details-image__left-item"
            />
          </div>
          <div>
          <img
              src="/images/products/product_3.jpg"
              alt="product color"
              className="product-details-image__left-item"
            />
          </div>
          <div>
          <img
              src="/images/products/product_4.jpg"
              alt="product color"
              className="product-details-image__left-item"
            />
          </div>
        </Slider>
      </div>
    );
  }
}
