import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import useUser from "./hooks/useUser";

import HomePage from "../src/pages/HomePage/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage/LoginPage.jsx";
import SignUpPage from "../src/pages/SignUpPage/SignUpPage.jsx";
import NavBar from "../src/components/NavBar/NavBar.jsx";
import TrackPage from "./pages/TrackPage/TrackPage";
import MangaDetails from "../src/pages/MangaDetails/MangaDetails.jsx";
import UpdatePage from "./pages/UpdatePage/UpdatePage";
import BrowsePage from "./pages/BrowsePage/BrowsePage";

function App() {
  const { refreshAuth } = useUser();

  useEffect(() => {
    async function run() {
      await refreshAuth();
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/track" element={<TrackPage />} />
        <Route exact path="/manga/detail/:mangaID" element={<MangaDetails />} />
        <Route exact path="/manga/update/:mangaID" element={<UpdatePage />} />
        <Route exact path="/browse" element={<BrowsePage />} />
      </Routes>
    </div>
  );
}

export default App;
