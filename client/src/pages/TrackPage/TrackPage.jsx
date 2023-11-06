import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { MANGA_TYPE, COMIC_STATUS, READING_STATUS } from '../../utils/constants.js';
import { trackManga } from '../../utils/mangaServices.js';
import useUser from '../../hooks/useUser.js';

import DynamicInput from "../../components/Inputs/DynamicInput/DynamicInput.jsx";
import AddTag from '../../components/AddTag/AddTag.jsx';
import NumberInput from '../../components/Inputs/NumberInput/NumberInput.jsx';
import MangaSelect from '../../components/Inputs/MangaSelect/MangaSelect.jsx';
import TextEditor from "../../components/TextEditor/TextEditor.jsx"
import Rating from '../../components/Rating/Rating.jsx';
import Button from '../../components/Button/Button.jsx';
import AccessDenied from '../../components/AccessDenied/AccessDenied.jsx';
import "./TrackPage.css"

function TrackPage() {

    const navigate = useNavigate()

    const { user } = useUser()

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

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        trackManga(manga).then((res) => {
          navigate("/")
        })
        console.log(manga)
      } catch(error) {
        console.log(error)
      }
    }

  const [manga, setManga] = useState({
    name: [""], 
    artist: [""], 
    summary: null, 
    chapRead: 0,
    type: "",
    comicStatus: "", 
    readingStatus: "", 
    rating: null, 
    tags: []
  })

  return (
    <>
    { user ? (
<div id="trackPage">
      <h2>Track a Comic</h2>
      <form id='track_form'>
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
        <div id='small_select_cont'>
          <NumberInput manga={manga} setManga={setManga}/>
          <MangaSelect
            opt={MANGA_TYPE}
            text="Type"
            selectedValue={manga.type}
            handleChange={handleTypeChange}
          />
          <MangaSelect
            opt={COMIC_STATUS}
            text="Comic status"
            selectedValue={manga.comicStatus}
            handleChange={handleCStatusChange}
          />
          <MangaSelect
            opt={READING_STATUS}
            text="Reading status"
            selectedValue={manga.readingStatus}
            handleChange={handleRStatusChange}
          />
        </div>
        <TextEditor setManga={setManga} initValue="" extensive="true"/>
        <Rating rating={manga.rating} onRatingChange={handleRatingChange} />
        <div>
          <Button text="TRACK" clickHandler={handleSubmit}/>
        </div>
      </form>
    </div> 
    ) : (
      <AccessDenied />
    )}
    </>
  );
}

export default TrackPage