import React, { useState } from 'react'
import { FaSort } from "react-icons/fa";


import "./SortMenu.css"

function SortMenu() {
  const [showSort, setShowSort] = useState(false)

    function displaySort() {
      setShowSort(!showSort);
    }
  return (
    <div id="sort-container">
      <div id="sort-icons-cont" onClick={displaySort}>
        <span>Sort</span>
        <FaSort size={22} />
      </div>
      <div id={showSort ? "sort-show" : "sort-hidden"}>
        <div id="sort-options">
          <p>Name</p>
          <p>Artist</p>
          <p>Rating</p>
        </div>
        <div id="sort-order">
          <p>ASC</p>
          <p>DESC</p>
        </div>
      </div>
    </div>
  );
}

export default SortMenu