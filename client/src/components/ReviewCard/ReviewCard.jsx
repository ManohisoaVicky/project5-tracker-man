import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { formatDateTime } from '../../utils/utils'

import "./ReviewCard.css"

function ReviewCard({review}) {
    console.log(review)
  return (
    <div className='review-card-cont'>
        {HTMLReactParser(review.content)}
        <p>{formatDateTime(review.createdAt)}</p>
    </div>
  )
}

export default ReviewCard