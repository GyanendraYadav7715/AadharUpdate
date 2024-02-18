import React from "react";
import Login from "./Authentication/Login";
import Forget from "./Authentication/Forget";
import HeaderNavbar from "./Components/HeaderNabar/HeaderNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/headernavbar" element={<HeaderNavbar />} />
          <Route path="/forget" element={<Forget />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
