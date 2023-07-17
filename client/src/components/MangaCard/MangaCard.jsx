import React from 'react'

import "./MangaCard.css"

function MangaCard({ manga }) {
  return (
    <div key={manga.id} className="manga_cont">
        {manga.name}
    </div>
  )
}

export default MangaCard