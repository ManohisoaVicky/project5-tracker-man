import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = [];
  for (let i = 1; i <= totalPages; i++) {
    pageRange.push(i);
  }

  return (
    <div>
      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
