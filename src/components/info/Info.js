import "./info.css";
export default function Info({ heading, name, image }) {
  return (
    
      <div className="">
        <div className="info__wrapper">
          <div className="info__image">
            <img className="info__image-img" src={image} />
          </div>
          <div className="info__text">
            <h4 className="info__text-heading">{heading}</h4>
            <h2 className="info__text-name">{name}</h2>
            <button className="btn">Show Details</button>
          </div>
        </div>
      </div>

  );
}
