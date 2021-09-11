import LocationBar from "../../components/bar/locationbar/LocationBar";
import "./productdetails.css";

export default function ProductDetails() {
  return (
    <div className="product-details">
      <div className="product-details-section">
        <div className="product-details-row">
          <LocationBar />
          <div className="row">
            <div className="product-details-left-info">
              <div className="product-details-image">
                <div className="product-details-image__left">
                  <img
                    src="images/product_1.jpg"
                    className="product-details-image__left-item"
                  />
                  <img
                    src="images/product_2.jpg"
                    className="product-details-image__left-item"
                  />
                  <img
                    src="images/product_3.jpg"
                    className="product-details-image__left-item"
                  />
                  <img
                    src="images/product_4.jpg"
                    className="product-details-image__left-item"
                  />
                </div>
                <div className="product-details-image__right">
                  <img
                    src="images/product_1.jpg"
                    className="product-details-image__right-item"
                  />
                </div>
              </div>
            </div>
            <div className="product-details-right-info">
              <h2 className="product-details-name">Iphone 12 ProMax 256 GB</h2>
              <h3 className="product-details-price">27.990.000 VND</h3>
              <p className="product-details-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a
                doloribus iste natus et facere? dolor sit amet consectetur
                adipisicing elit. Sunt a doloribus iste natus et facere?
              </p>
              <div className="product-details-choose">
                <div className="product-details-choose__item">
                  <label for="memory">Memory:</label>
                  <select className="product-details-choose__item-select" name="memory" id="memory">
                    <option value="128">128 GB</option>
                    <option value="256">256 GB</option>
                    <option value="512">512 GB</option>
                  </select>
                </div>
                <div className="product-details-choose__item">
                  <label for="color">Color:</label>
                  <select className="product-details-choose__item-select" name="color" id="color">
                    <option value="white">White</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                    <option value="black">Black</option>
                  </select>
                </div>
              </div>
              <div className="product-details-quantity">
                <p className="product-details-text__bold">Quantity:</p>
                <input type="text" placeholder="1" className="product-details-quantity-input" />
              </div>
              <p><span className="product-details-text__bold">Brand:</span> Apple</p>
              <p><span className="product-details-text__bold">Product type:</span> Phone</p>
              <p><span className="product-details-text__bold">Availability:</span> <span className="product-details-text__green">In Stock 28 items</span></p> 
              <div className="product-details__btn">
                <button className="btn">Add to cart</button>
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
