import React from 'react'
import { removeSpace, googleSearchAuthor, isNotEmpty, isLastElement } from "../../utils/utils.js"

import RatingDisplay from '../RatingDisplay/RatingDisplay.jsx'
import DisplayTags from '../DisplayTags/DisplayTags.jsx'
import HTMLReactParser from 'html-react-parser'

import "./MangaInfo.css"

function MangaInfo({ manga }) {

    const type = removeSpace(manga.type)

      const author_link = manga.artist.map((artist) => {
        if (isNotEmpty(artist)) {
          const authorLink = googleSearchAuthor(artist);
          return (
            <span key={artist}>
              <a href={authorLink} target="_blank" rel="noreferrer">
                {artist} {!isLastElement(manga.artist, artist) ? "· " : <></>}
              </a>
            </span>
          );
        }
        return null; 
      });

  return (
    <div id="detailed_manga_info">
      <h1>
        {manga.name[0]} <span id="detailed_manga_type">({type || "N/A"})</span>
      </h1>
      {manga.name.length > 1 ? (
        manga.name.map((name) => {
          return (
            <span>
              {" "}
              {name} {!isLastElement(manga.name, name) ? "·" : <></>}
            </span>
          );
        })
      ) : (
        <></>
      )}
      {author_link ? (
        <p className="manga_info_artist">
          {author_link.length > 0 ? author_link : "N/A"}
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
        <p>
          Chapters Read:{" "}
          <span>{manga.chapRead > 0 ? manga.chapRead : "N/A"}</span>
        </p>
        <div id="manga_status_div">
          <p>
            Comic Status:{" "}
            <span>
              {isNotEmpty(manga.comicStatus) ? manga.comicStatus : "N/A"}
            </span>
          </p>
          <p>
            Reading Status:{" "}
            <span>
              {isNotEmpty(manga.readingStatus) ? manga.readingStatus : "N/A"}
            </span>
          </p>
        </div>
      </div>
      <DisplayTags tags={manga.tags} />
      <p id="detailed_synopsis_p">Synopsis:</p>
      <div id="detailed_synopsis">
        {manga.summary ? (
          HTMLReactParser(manga.summary)
        ) : (
          <p>Synopsis not provided.</p>
        )}
      </div>
    </div>
  );
}

export default MangaInfo