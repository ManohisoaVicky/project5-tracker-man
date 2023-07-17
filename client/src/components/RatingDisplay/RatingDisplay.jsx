import { FaStar } from "react-icons/fa";

import "./RatingDisplay.css";

const Rating = ({ rating }) => {

  return (
    <div className="rating">
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
            <span
              className={classes}
            >
              <FaStar />
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
