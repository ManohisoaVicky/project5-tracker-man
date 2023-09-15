import React, { useState, useEffect } from 'react'
import Pagination from '../Pagination/Pagination'
import { fetchReviews } from '../../utils/reviewServices'
import ReviewCard from '../ReviewCard/ReviewCard'

import "./ReviewList.css"

function ReviewList({mangaID}) {

    const [reviews, setReviews] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
      const fetchMangasData = async () => {
        try {
          const data = await fetchReviews(currentPage, mangaID);
          setReviews(data);
          setTotalPages(Math.ceil(data.totalPages));
        } catch (error) {
          console.error(error);
        }
      };
      fetchMangasData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, mangaID]);

  return (
    <div>
        {reviews ? (
            reviews.reviews.map((review) => (
                <ReviewCard review={review} />
            ))
        ): <p>no reviews</p>}
    </div>
  )
}

export default ReviewList