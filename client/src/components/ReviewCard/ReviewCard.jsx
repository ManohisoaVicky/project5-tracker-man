import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { formatDateTime } from "../../utils/utils";
import Button from "../Button/Button";
import { deleteReview } from "../../utils/reviewServices";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import "./ReviewCard.css";

function ReviewCard({ review, mangaID }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const reviewContent = showMore
    ? review.content
    : `${review.content.slice(0, 100)}${
        review.content.length > 100 ? "..." : ""
      }`;
  const shouldDisplayButton = review.content.length > 100;

  return (
    <div className="review-card-cont">
      <div className="review-content">{HTMLReactParser(reviewContent)}</div>
      {shouldDisplayButton && (
        <div className="show-more-button">
          <span
            onClick={toggleShowMore}
            className={`show-span ${showMore ? "less" : "more"}`}
          >
            {showMore ? (
              <>
                Show Less <FaAngleUp className="show-icon" />
              </>
            ) : (
              <>
                Show More <FaAngleDown className="show-icon" />
              </>
            )}
          </span>
        </div>
      )}
      <div className="review-card-info-cont">
        <span className="review-posted-date">
          Posted on: {formatDateTime(review.createdAt)}
        </span>
        <Button
          action="DELETE REVIEW"
          text="Delete"
          clickHandler={() => deleteReview(mangaID, review._id)}
        />
      </div>
    </div>
  );
}

export default ReviewCard;
