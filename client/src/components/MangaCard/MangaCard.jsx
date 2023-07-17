import React from 'react'

import { capitalizeWords } from "../../utils/utils.js"

import "./MangaCard.css"

function MangaCard({ manga }) {

    let manga_name = capitalizeWords(manga.name[0])
    let manga_artist = capitalizeWords(manga.artist[0])
  return (
    <div key={manga.id} className="manga_cont">
        <div className="manga_main_info">
            <p>{manga_name}</p>
            <p>{manga_artist || "Unspecified"}</p>
        </div>
    </div>
  )
}

export default MangaCard