import React, { useState } from 'react'

import DynamicInput from "../../components/Inputs/DynamicInput/DynamicInput.jsx";
import AddTag from '../../components/AddTag/AddTag.jsx';
import NumberInput from '../../components/Inputs/NumberInput/NumberInput.jsx';
import "./TrackPage.css"

function TrackPage() {

    const handleAddFields = (fieldName) => {
      const values = [...manga[fieldName]];
      values.push("");
      setManga({
        ...manga,
        [fieldName]: values,
      });
    };

    const handleRemoveFields = (fieldName, index) => {
      const values = [...manga[fieldName]];
      values.splice(index, 1);
      setManga({
        ...manga,
        [fieldName]: values,
      });
    };

    const handleInputChange = (fieldName, index, event) => {
      const values = [...manga[fieldName]];
      values[index] = event.target.value;
      setManga({
        ...manga,
        [fieldName]: values,
      });
    };

  const [manga, setManga] = useState({
    name: [""], 
    artist: [""], 
    summary: null, 
    chapRead: 0,
    comicStatus: null, 
    readingStatus: null, 
    rating: null, 
    review: null,
    tags: []
  })

  return (
    <div id="trackPage">
      <h2>Track a Comic</h2>
      <form>
        <DynamicInput
          setManga={setManga}
          handleAddFields={handleAddFields}
          handleRemoveFields={handleRemoveFields}
          handleInputChange={handleInputChange}
          field={manga.name}
          fieldName="name"
          placeholder="Enter name"
          label="Name"
          btnTxt="ADD NAME"
        />
        <DynamicInput
          setManga={setManga}
          handleAddFields={handleAddFields}
          handleRemoveFields={handleRemoveFields}
          handleInputChange={handleInputChange}
          field={manga.artist}
          fieldName="artist"
          placeholder="Enter artist"
          label="Artist"
          btnTxt="ADD ARTIST"
        />
        <AddTag manga={manga} setManga={setManga} />
        <NumberInput manga={manga} setManga={setManga} />
      </form>
    </div>
  );
}

export default TrackPage