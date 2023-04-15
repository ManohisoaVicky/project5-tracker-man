import React from "react";
import "./MangaSelect.css";

function MangaSelect({ opt, handleChange, text, selectedValue }) {
  return (
    <div>
      <select onChange={handleChange} value={selectedValue}>
        <option disabled value="">
          {text}
        </option>
        {opt.map((op) => {
          return (
            <option value={op} key={op}>
              {op}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default MangaSelect;
