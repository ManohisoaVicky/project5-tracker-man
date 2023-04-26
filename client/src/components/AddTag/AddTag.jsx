import React from 'react'
import { MANGA_TAGS } from "../../utils/constants"

import "./AddTag.css"

function AddTag({ manga, setManga }) {

  function handleTagsChange(e) {
    const value = e.target.value
    if (manga.tags.includes(value)) {
      const index = manga.tags.indexOf(value)
     setManga((prevState) => ({
       ...prevState,
       tags: [...prevState.tags.filter((_, i) => i !== index)],
     }));
    }
    else {
      setManga((prevState) => ({
        ...prevState,
        tags: [...manga.tags, value],
      }));
    }
  }

  return (
    <div id="add_tag_cont">
      <select multiple value={manga.tags} onChange={handleTagsChange}>
        <option disabled value="">Add tags</option>
        {MANGA_TAGS.map((manga) => {
          return (
            <option value={manga} key={manga}>
              {manga}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default AddTag