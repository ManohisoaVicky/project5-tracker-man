import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { formatDateTime } from '../../utils/utils'
import Button from '../Button/Button'

import "./ReviewCard.css"

function ReviewCard({review}) {
    console.log(review)
  return (
    <div className="review-card-cont">
      {HTMLReactParser(review.content)}
      <div className='review-card-info-cont'>
        <span>{formatDateTime(review.createdAt)}</span>
        <Button action="DELETE REVIEW" text="Delete"/>
      </div>
    </div>
  );
}

export default ReviewCard