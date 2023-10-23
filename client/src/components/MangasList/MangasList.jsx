import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { isLastElement } from "../../utils/utils";
import "./MangasList.css";

import MangaCard from "../MangaCard/MangaCard";

const MangaList = ({mangas, currentPage, totalPages, handlePageChange, to, from, totalMangas}) => {

  return (
    <div id="manga_list_cont">
      <div id="manga-list-info">
        <p>{`Showing ${from}-${to} of ${totalMangas} results`}</p>
        <Link to="/track" id="track-btn">
          Track
        </Link>
      </div>
      {mangas &&
        mangas.map((manga) => <MangaCard manga={manga} id={isLastElement(mangas, manga) ? "last_manga" : null} key={manga._id} />)}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MangaList;
