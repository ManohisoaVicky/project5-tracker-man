import React from 'react'
import { removeSpace, googleSearchAuthor } from "../../utils/utils.js"

import "./MangaInfo.css"

function MangaInfo({ manga }) {

    const type = removeSpace(manga.type)

    const author_link = googleSearchAuthor(manga.artist[0])

  return (
    <div id="detailed_manga_info">
      <h1>
        {manga.name} <span id='detailed_manga_type'>({type})</span>
      </h1>
      {author_link ? (
        <a href={author_link} target='_blank' rel="noreferrer">{manga.artist}</a>
      ): (<p>N/A</p>)}
    </div>
  );
}

export default MangaInfo