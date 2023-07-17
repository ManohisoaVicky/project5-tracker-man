import React from 'react'

import RatingDisplay from "../RatingDisplay/RatingDisplay.jsx"
import { capitalizeWords } from "../../utils/utils.js"

import "./MangaCard.css"

function MangaCard({ manga }) {

    let manga_name = capitalizeWords(manga.name[0])
    let manga_artist = capitalizeWords(manga.artist[0])
  return (
    <div key={manga.id} className="manga_cont">
      <div className="manga_main_info">
        <p>{manga_name}</p>
        <p>{manga_artist || "N/A"}</p>
      </div>
      <div className="manga_info_wrapper">
        <p>Type: {manga.type || "N/A"}</p>
        <p className='reading_status'>Reading Status: {manga.readingStatus || "N/A"}</p>
      </div>
      <RatingDisplay rating={manga.rating} />
    </div>
  );
}

export default MangaCard