import { FaStar } from "react-icons/fa";
import "./RatingDisplay.css";

const Rating = ({ rating }) => {
  if (!rating) {
    return (
        <span className="rating-icon">No Rating</span>
    );
  }

  return (
    <div className="rating_display">
      {[...Array(10)].map((_, index) => {
        const ratingValue = index + 1;
        let classes = "star";

        if (ratingValue <= rating) {
          classes += " selected";
        }

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
            />
            <span className={classes}>
              <FaStar />
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
