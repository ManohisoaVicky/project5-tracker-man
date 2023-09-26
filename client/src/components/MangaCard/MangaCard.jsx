import React from 'react'
import { Link } from 'react-router-dom'

import RatingDisplay from "../RatingDisplay/RatingDisplay.jsx"
import { capitalizeWords } from "../../utils/utils.js"
import { FaTrash } from "react-icons/fa";

import "./MangaCard.css"

function MangaCard({ manga }) {

    let manga_name = capitalizeWords(manga.name[0])
    let manga_artist = capitalizeWords(manga.artist[0])
    
  return (
    <Link to={`/manga/detail/${manga._id}`}>
      <div className="manga_cont">
        <div className="manga_info_cont">
          <div className="manga_main_info">
            <p>{manga_name}</p>
            <p>{manga_artist || "N/A"}</p>
          </div>
          <div className="manga_info_wrapper">
            <p className="manga_card_type">
              Type: <span>{manga.type || "N/A"}</span>
            </p>
            <p className="reading_status">
              Reading Status: <span>{manga.readingStatus || "N/A"}</span>
            </p>
          </div>
        </div>
        <RatingDisplay rating={manga.rating} />
        <FaTrash size={20} className='manga-dlt-btn'/>
      </div>
    </Link>
  );
}

export default MangaCard