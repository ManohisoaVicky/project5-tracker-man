import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getSingleManga } from '../../utils/mangaServices'
import DynamicInput from '../../components/Inputs/DynamicInput/DynamicInput'
import AddTag from '../../components/AddTag/AddTag'
import NumberInput from '../../components/Inputs/NumberInput/NumberInput'
import MangaSelect from '../../components/Inputs/MangaSelect/MangaSelect'
import TextEditor from '../../components/TextEditor/TextEditor'
import Rating from '../../components/Rating/Rating'
import { MANGA_TYPE } from '../../utils/constants'
import { COMIC_STATUS } from '../../utils/constants'
import { READING_STATUS } from '../../utils/constants'
import Button from '../../components/Button/Button'

import "./UpdatePage.css"

function UpdatePage() {
  const [manga, setManga] = useState()

  let mangaID = useParams().mangaID

  useEffect(() => {
    async function fetchManga() {
      try {
        const response = await getSingleManga(mangaID);
        setManga(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchManga();
  }, [mangaID]);

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
   };

   const handleCStatusChange = (e) => {
     setManga((prev) => ({ ...prev, comicStatus: e.target.value }));
   };

   const handleRStatusChange = (e) => {
     setManga((prev) => ({ ...prev, readingStatus: e.target.value }));
   };

    const handleRatingChange = (newRating) => {
      setManga((prevManga) => ({ ...prevManga, rating: newRating }));
    };


  return (
    <div id="update-page-main-cont">
      {manga ? (
        <>
          <h2>Update Comic</h2>
          <form id="update-form">
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
            <div id="small_select_cont">
              <NumberInput manga={manga} setManga={setManga} />
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
            <TextEditor
              setManga={setManga}
              initValue={manga.summary}
              extensive="true"
            />
            <Rating rating={manga.rating} onRatingChange={handleRatingChange} />
            <div>
              <Button text="UPDATE" />
            </div>
          </form>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default UpdatePage