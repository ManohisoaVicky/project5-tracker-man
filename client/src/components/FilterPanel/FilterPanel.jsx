import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
  MANGA_TYPE,
  READING_STATUS,
  COMIC_STATUS,
} from "../../utils/constants";

import "./FilterPanel.css";

function FilterPanel( { setFilter }) {
  const [showFilter, setShowFilter] = useState(false);

  function displayFilter() {
    setShowFilter(!showFilter);
  }

  function handleCheckboxChange(event, category) {
    const option = event.target.value;

    if (event.target.checked) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [category]: [...prevFilter[category], option],
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [category]: prevFilter[category].filter((item) => item !== option),
      }));
    }
  }

  return (
    <div id="filter-container">
      <div id="filter-icons-cont" onClick={displayFilter}>
        <span>Filter</span>
        <FaFilter />
      </div>
      <div id={showFilter ? "filter-show" : "filter-hidden"}>
        <p>Types:</p>
        <div className="filter-options-cont">
          {MANGA_TYPE.map((type) => (
            <label className="checkbox-label" key={type}>
              <input
                type="checkbox"
                value={type}
                onChange={(event) => handleCheckboxChange(event, "types")}
              />
              <span className="greenmark"></span>
              {type}
            </label>
          ))}
        </div>
        <p>Comic Status:</p>
        <div className="filter-options-cont">
          {COMIC_STATUS.map((status) => (
            <label className="checkbox-label" key={status}>
              <input
                type="checkbox"
                value={status}
                onChange={(event) => handleCheckboxChange(event, "comicStatus")}
              />
              <span className="greenmark"></span>
              {status}
            </label>
          ))}
        </div>
        <p>Reading Status:</p>
        <div className="filter-options-cont">
          {READING_STATUS.map((status) => (
            <label className="checkbox-label" key={status}>
              <input
                type="checkbox"
                value={status}
                onChange={(event) =>
                  handleCheckboxChange(event, "readingStatus")
                }
              />
              <span className="greenmark"></span>
              {status}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
