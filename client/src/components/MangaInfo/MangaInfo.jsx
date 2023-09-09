import React from 'react'
import { removeSpace, googleSearchAuthor, isNotEmpty } from "../../utils/utils.js"

import RatingDisplay from '../RatingDisplay/RatingDisplay.jsx'
import DisplayTags from '../DisplayTags/DisplayTags.jsx'

import "./MangaInfo.css"

function MangaInfo({ manga }) {

    const type = removeSpace(manga.type)

    const author_link = googleSearchAuthor(manga.artist[0])

  return (
    <div id="detailed_manga_info">
      <h1>
        {manga.name} <span id="detailed_manga_type">({type})</span>
      </h1>
      {author_link ? (
        <p className="manga_info_artist">
          <a href={author_link} target="_blank" rel="noreferrer">
            {manga.artist}
          </a>
        </p>
      ) : (
        <p className="manga_info_artist">N/A</p>
      )}
      {manga.rating ? (
        <RatingDisplay rating={manga.rating} />
      ) : (
        <p>No Rating</p>
      )}
      <div id="manga_info_div">
        <p>Chapters Read: <span>{manga.chapRead > 0 ? manga.chapRead : "N/A"}</span></p>
        <div id="manga_status_div">
          <p>Comic Status: <span>{(isNotEmpty(manga.comicStatus) ? manga.comicStatus : "N/A")}</span></p>
          <p>Reading Status: <span>{(isNotEmpty(manga.readingStatus) ? manga.readingStatus : "N/A")}</span></p>
        </div>
      </div>
      <DisplayTags tags={manga.tags}/>
    </div>
  );
}

export default MangaInfo