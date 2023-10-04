import React from 'react'
import MangaList from '../../components/MangasList/MangasList.jsx'
import SearchBar from "../../components/SearchBar/SearchBar.jsx"
import FilterPanel from "../../components/FilterPanel/FilterPanel.jsx"
import SortMenu from "../../components/SortMenu/SortMenu.jsx"

import "./DashboardPage.css"

function DashboardPage() {
  return (
    <div id="dashboardPage">
      <div id="dashboard-control-panel">
        <SearchBar />
        <div id='filter-sort-container'>
          <FilterPanel />
          <SortMenu />
        </div>
      </div>
      <MangaList />
    </div>
  );
}

export default DashboardPage