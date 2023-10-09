import React from 'react'
import { FaFilter } from "react-icons/fa";

import "./FilterPanel.css"

function FilterPanel() {
  return (
    <div id='filter-container'>
      <span>Filter</span><FaFilter />
    </div>
  )
}

export default FilterPanel 