import React, { useState } from "react";
import { MANGA_TAGS } from "../../utils/constants";

import "./AddTag.css";

function AddTag({ manga, setManga }) {
  const [selectedTags, setSelectedTags] = useState(manga.tags);

  function handleTagsChange(e) {
    const value = e.target.value;
    let updatedTags = [...selectedTags];
    if (updatedTags.includes(value)) {
      updatedTags = updatedTags.filter((tag) => tag !== value);
    } else {
      updatedTags.push(value);
    }
    setSelectedTags(updatedTags);
    setManga((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));
  }

  function removeTag(index) {
    const updatedTags = [...selectedTags.filter((_, i) => i !== index)];
    setSelectedTags(updatedTags);
    setManga((prevState) => ({
      ...prevState,
      tags: updatedTags,
    }));
  }

  const availableTags = MANGA_TAGS.filter((tag) => !selectedTags.includes(tag));

  return (
    <div id="add_tag_cont">
      <div id="selected_tag_cont">
        <ul>
          {selectedTags.map((tag, index) => (
            <li key={index}>
              {tag}
              <span className="close" onClick={() => removeTag(index)}>
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
      <select
        multiple
        value={selectedTags}
        onChange={handleTagsChange}
        id="select_input"
      >
        <option disabled>──────────</option>
        <option disabled value="" className="tag_option">
          Add tags
        </option>
        {availableTags.map((tag) => (
          <option key={tag} value={tag} className="tag_option">
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddTag;
