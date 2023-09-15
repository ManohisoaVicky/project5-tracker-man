import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleManga } from '../../utils/mangaServices'
import MangaInfo from '../../components/MangaInfo/MangaInfo'
import ReviewComp from '../../components/ReviewComp/ReviewComp'

import "./MangaDetails.css"

function MangaDetails() {

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
    <div className="manga_details_cont">
      {manga ? (
        <>
          <MangaInfo manga={manga} />
          <ReviewComp manga={manga} />
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
}

export default MangaDetails