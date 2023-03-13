import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "../src/pages/HomePage/HomePage.jsx";
import NavBar from "../src/components/NavBar/NavBar.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
