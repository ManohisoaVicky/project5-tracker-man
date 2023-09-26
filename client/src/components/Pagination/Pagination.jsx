import React from "react";
import "./Pagination.css"; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = [];

  const paginationSize = 6;
  const halfSize = Math.floor(paginationSize / 2);

  let startPage = Math.max(currentPage - halfSize, 1);
  let endPage = startPage + paginationSize - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - paginationSize + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageRange.push(i);
  }

  return (
    <div>
      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active_pagination_btn" : "pagination_btn"}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
