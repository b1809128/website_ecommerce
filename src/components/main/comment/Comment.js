import { Link } from "react-router-dom";
import "./comment.css";

export default function Comment({ image, title, date, tags }) {
  return (
    <Link to="/tin-cong-nghe" className="comment-link">
      <div className="comment">
        <div className="comment-image">
          <img src={image} className="comment-image__img" alt={title} />
        </div>
        <p className="comment-text" title={title}>
          {title}
        </p>

        <div className="comment__tag-wrapper">
          <button className="comment__tag">{tags}</button>
          <p className="comment__date">{date}</p>
        </div>
      </div>
    </Link>
  );
}
