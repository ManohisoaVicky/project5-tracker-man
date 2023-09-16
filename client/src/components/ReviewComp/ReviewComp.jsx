import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { addReview } from '../../utils/reviewServices'

import TextEditor from '../TextEditor/TextEditor'
import Button from '../Button/Button'
import ReviewList from '../ReviewList/ReviewList'
import "./ReviewComp.css"

function ReviewComp() {

    let mangaID = useParams().mangaID

    const [review, setReview] = useState({
        content: ""
    })

    const handleSubmit = async (e) => {
        try {
            await addReview(review, mangaID); 
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div id='review_comp_cont'>
        <form id='add_review_form'>
            <TextEditor setReview={setReview} initValue={review.content}/>
            <Button text="ADD REVIEW" clickHandler={handleSubmit} review={review.content}/>
        </form>
        <ReviewList mangaID={mangaID}/>
    </div>
  )
}

export default ReviewComp