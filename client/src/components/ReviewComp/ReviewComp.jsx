import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { addReview } from '../../utils/reviewServices'

import TextEditor from '../TextEditor/TextEditor'
import Button from '../Button/Button'
import "./ReviewComp.css"

function ReviewComp() {

    let mangaID = useParams().mangaID

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            addReview(review, mangaID).then((res) => {
            // navigate("/");
            console.log("review successfully added")
        });
        console.log(review);
        } catch (error) {
            console.log(error);
        }
    };

    const [review, setReview] = useState({
        content: ""
    })
  return (
    <div id='review_comp_cont'>
        <form id='add_review_form'>
            <TextEditor setReview={setReview}/>
            <Button text="ADD REVIEW" clickHandler={handleSubmit}/>
        </form>
    </div>
  )
}

export default ReviewComp