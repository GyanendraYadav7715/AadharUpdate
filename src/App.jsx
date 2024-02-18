import React from "react";
import Login from "./Authentication/Login";
import Forget from "./Authentication/Forget";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
     
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/forget" element={<Forget />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
