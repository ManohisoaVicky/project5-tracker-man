import React from "react";

import "./SearchBar.css";

function SearchBar({ search, setSearch }) {

const handleInputChange = (e) => {
  const userInput = e.target.value;
  setSearch(userInput); 
};

  return (
    <div id="search-container">
      <input
        placeholder="Search tracked comic"
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
