import React from 'react'
import { useParams } from 'react-router-dom'

import "./MangaDetails.css"

function MangaDetails() {

  let mangaID = useParams().mangaID

  return (
    <div className='manga_details_cont'>MangaDetails</div>
  )
}

export default MangaDetails