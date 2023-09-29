import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getSingleManga } from '../../utils/mangaServices'
import DynamicInput from '../../components/Inputs/DynamicInput/DynamicInput'
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
  return (
    <div id='update-page-cont'>
      {manga ? (
        <p>manga found</p>
      ): <p>Loading</p>}
    </div>
  )
}

export default UpdatePage