import React, { useState } from "react";
import { FaSort } from "react-icons/fa";

import "./SortMenu.css";

function SortMenu({ setSort }) {
  const [showSort, setShowSort] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(""); // Added state for selected order

  const sortOptions = ["Name", "Artist", "Rating"];

  function displaySort() {
    setShowSort(!showSort);
  }

  function handleSortChange(event) {
    setSort({ sort: event.target.value, order: selectedOrder });
  }

  function handleOrderChange(order) {
    setSelectedOrder(order);
    setSort((prevSort) => ({ ...prevSort, order }));
  }

  return (
    <div id="sort-container">
      <div id="sort-icons-cont" onClick={displaySort}>
        <span>Sort</span>
        <FaSort size={22} />
      </div>
      <div id={showSort ? "sort-show" : "sort-hidden"}>
        <div id="sort-options">
          {sortOptions.map((option) => (
            <label className="radio-label" key={option}>
              <input
                type="radio"
                value={option}
                name="sortOption"
                onChange={handleSortChange}
              />
              <span className="greenradio"></span>
              {option}
            </label>
          ))}
        </div>
        <div id="sort-order">
          <p
            onClick={() => handleOrderChange("ASC")}
            className={selectedOrder === "ASC" ? "sort-option-chosen" : ""}
          >
            ASC
          </p>
          <p
            onClick={() => handleOrderChange("DESC")}
            className={selectedOrder === "DESC" ? "sort-option-chosen" : ""}
          >
            DESC
          </p>
        </div>
      </div>
    </div>
  );
}

export default SortMenu;
