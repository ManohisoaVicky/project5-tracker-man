import React, { useState } from 'react'

import TextEditor from '../TextEditor/TextEditor'
import "./ReviewComp.css"

function ReviewComp() {

    const [review, setReview] = useState({
        content: ""
    })
  return (
    <div id='review_comp_cont'>
        <form id='add_review_form'>
            <TextEditor setReview={setReview}/>
        </form>
    </div>
  )
}

export default ReviewComp