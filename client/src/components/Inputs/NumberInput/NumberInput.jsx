import React from "react";

const NumberInput = ({ manga, setManga }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (Number.isNaN(newValue)) {
      return;
    }
    setManga({ ...manga, chapRead: newValue });
  };

  const handleInput = (e) => {
    if (e.target.value === "") {
      setManga({ ...manga, chapRead: 0 });
    }
  };


  return (
    <div id="num_input_cont">
      <input
        type="number"
        min={0}
        onChange={handleChange}
        onInput={handleInput}
      />
    </div>
  );
};

export default NumberInput;
