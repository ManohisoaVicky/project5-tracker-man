import React from "react";
import "./NumberInput.css";

const NumberInput = ({ manga, setManga }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (Number.isNaN(newValue)) {
      return;
    }
    setManga({ ...manga, chapRead: newValue });
  };

  const handleInput = (e) => {
    let newValue = parseInt(e.target.value);
    if (Number.isNaN(newValue)) {
      newValue = 0; // Set it to 0 if the input is not a number
    }
    setManga({ ...manga, chapRead: newValue });
  };

  return (
    <div id="num_input_cont">
      <input
        type="number"
        min={0}
        placeholder="Chapters Read"
        value={manga.chapRead}
        onChange={handleChange}
        onInput={handleInput}
      />
    </div>
  );
};

export default NumberInput;
