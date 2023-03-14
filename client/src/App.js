import "./App.css";
import { Route, Routes } from "react-router-dom";

import HomePage from "../src/pages/HomePage/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage/LoginPage.jsx";
import SignUpPage from "../src/pages/SignUpPage/SignUpPage.jsx";
import NavBar from "../src/components/NavBar/NavBar.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
