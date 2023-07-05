import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { fetchMangas } from "../../utils/mangaServices.js";
import "./MangasList.css";

const MangaList = () => {
  const [mangas, setMangas] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMangasData = async () => {
      try {
        const data = await fetchMangas(currentPage);
        setMangas(data);
        setTotalPages(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMangasData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div id="manga_list_cont">
      {mangas &&
        mangas.map((manga) => <div key={manga.id} className="manga_cont">{manga.name}</div>)}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MangaList;