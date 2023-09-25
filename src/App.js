import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screen/Home/Home";
// import NotFound from "./Screen/Components/NotFound/NotFound";
import Login from "./Screen/Login";
import Navi from "./Navi/Navi";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);

  };

  return (
    <div className={darkMode ? "dark-mode" : ""} style={{ height: "100%" }}>
      <Router>
        {/* {isLoggedIn && (
          <Navi
            onDarkModeToggle={handleDarkModeToggle}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={logout}
          />
        )} */}
        <div className="Screen">
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
