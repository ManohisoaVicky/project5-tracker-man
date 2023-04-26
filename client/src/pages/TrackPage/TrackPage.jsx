import React, { useState } from 'react'

import { MANGA_TYPE, COMIC_STATUS, READING_STATUS } from '../../utils/constants.js';

import DynamicInput from "../../components/Inputs/DynamicInput/DynamicInput.jsx";
import AddTag from '../../components/AddTag/AddTag.jsx';
import NumberInput from '../../components/Inputs/NumberInput/NumberInput.jsx';
import MangaSelect from '../../components/Inputs/MangaSelect/MangaSelect.jsx';
import TextEditor from "../../components/TextEditor/TextEditor.jsx"
import Rating from '../../components/Rating/Rating.jsx';
import Button from '../../components/Button/Button.jsx';
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

    const handleTypeChange = (e) => {
      setManga((prev) => ({ ...prev, type: e.target.value }));
    }

    const handleCStatusChange = (e) => {
      setManga((prev) => ({ ...prev, comicStatus: e.target.value }));
    }

    const handleRStatusChange = (e) => {
      setManga((prev) => ({ ...prev, readingStatus: e.target.value }));
    }

    const handleRatingChange = (newRating) => {
      setManga((prevManga) => ({ ...prevManga, rating: newRating }));
    };

  const [manga, setManga] = useState({
    name: [""], 
    artist: [""], 
    summary: null, 
    chapRead: 0,
    type: null,
    comicStatus: null, 
    readingStatus: null, 
    rating: null, 
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
        <MangaSelect
          opt={MANGA_TYPE}
          text="Type"
          selectedValue={""}
          handleChange={handleTypeChange}
        />
        <MangaSelect
          opt={COMIC_STATUS}
          text="Comic status"
          selectedValue={""}
          handleChange={handleCStatusChange}
        />
        <MangaSelect
          opt={READING_STATUS}
          text="Reading status"
          selectedValue={""}
          handleChange={handleRStatusChange}
        />
        <TextEditor manga={manga} setManga={setManga} />
        <Rating rating={manga.rating} onRatingChange={handleRatingChange} />
        <div>
          <Button text="TRACK" />
        </div>
      </form>
    </div>
  );
}

export default TrackPage