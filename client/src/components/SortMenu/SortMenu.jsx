import React from 'react'
import { FaSort } from "react-icons/fa";


import "./SortMenu.css"

function SortMenu() {
  return (
    <div id='sort-container'>
      <span>Sort</span><FaSort size={22}/> 
    </div>
  );
}

export default SortMenu