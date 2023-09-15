import React from 'react'
import HTMLReactParser from 'html-react-parser'
import { formatDateTime } from '../../utils/utils'

import "./ReviewCard.css"

function ReviewCard({review}) {
    console.log(review)
  return (
    <div>
        <p>{formatDateTime(review.createdAt)}</p>
        {HTMLReactParser(review.content)}
    </div>
  )
}

export default ReviewCard