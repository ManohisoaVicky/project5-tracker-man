import { useState } from "react";
import { FaStar } from "react-icons/fa";

import "./Rating.css"

const Rating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (ratingValue) => {
    onRatingChange(ratingValue);
  };

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="rating">
      {[...Array(10)].map((_, index) => {
        const ratingValue = index + 1;
        let classes = "star";

        if (ratingValue <= (hoverRating || rating)) {
          classes += " hovered";
        }

        if (ratingValue <= rating) {
          classes += " selected";
        }

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRating(ratingValue)}
              className="hidden"
            />
            <span
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onMouseLeave={() => handleMouseLeave()}
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
