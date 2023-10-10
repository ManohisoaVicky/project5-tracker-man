import React, { useState, useEffect } from 'react'
import MangaList from '../../components/MangasList/MangasList.jsx'
import SearchBar from "../../components/SearchBar/SearchBar.jsx"
import FilterPanel from "../../components/FilterPanel/FilterPanel.jsx"
import SortMenu from "../../components/SortMenu/SortMenu.jsx"
import { fetchMangas } from '../../utils/mangaServices.js'

import "./DashboardPage.css"

function DashboardPage() {
    const [mangas, setMangas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState({
      types: [],
      comicStatus: [],
      readingStatus: [],
    });
useEffect(() => {
  let fetchTimeout;

  const fetchMangasData = async () => {
    try {
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
      }

      fetchTimeout = setTimeout(async () => {
        const data = await fetchMangas(currentPage, search, filter);
        setMangas(data.mangas);
        setTotalPages(Math.ceil(data.totalPages));
      }, 1000); 
    } catch (error) {
      console.error(error);
    }
  };

  fetchMangasData();

  return () => {
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }
  };
}, [currentPage, search, filter]);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  return (
    <div id="dashboardPage">
      <div id="dashboard-control-panel">
        <SearchBar 
        setMangas={setMangas} 
        currentPage={currentPage} 
        setTotalPages={setTotalPages}
        search={search}
        setSearch={setSearch}
        />
        <div id='filter-sort-container'>
          <FilterPanel setFilter={setFilter}/>
          <SortMenu />
        </div>
      </div>
      <MangaList 
        mangas={mangas} 
        currentPage={currentPage} 
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default DashboardPage