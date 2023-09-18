import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { formatDateTime } from '../../utils/utils'
import Button from '../Button/Button'
import { deleteReview } from '../../utils/reviewServices'

import "./ReviewCard.css"

function ReviewCard({review, mangaID}) {
  return (
    <div className="review-card-cont">
      {HTMLReactParser(review.content)}
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

export default ReviewCard