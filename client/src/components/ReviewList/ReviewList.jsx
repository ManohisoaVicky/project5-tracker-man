import React, { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { fetchReviews, deleteReview } from "../../utils/reviewServices"; // Import the deleteReview function
import ReviewCard from "../ReviewCard/ReviewCard";

import "./ReviewList.css";

function ReviewList({ mangaID }) {
  const [reviews, setReviews] = useState(null);
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

  // Callback function to handle review deletion
  const handleDeleteReview = async (reviewId) => {
    try {
      // Call the deleteReview function
      await deleteReview(mangaID, reviewId);
      // After successful deletion, update the reviews state
      setReviews((prevReviews) => ({
        ...prevReviews,
        reviews: prevReviews.reviews.filter(
          (review) => review._id !== reviewId
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {reviews ? (
        reviews.reviews.map((review) => (
          <ReviewCard
            review={review}
            mangaID={mangaID}
            key={review._id}
            onDelete={handleDeleteReview} 
          />
        ))
      ) : (
        <p>no reviews</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ReviewList;
