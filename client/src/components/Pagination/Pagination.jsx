import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = [];

  const paginationSize = 5;
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
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
