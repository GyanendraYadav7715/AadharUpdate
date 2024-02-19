import React from "react";
import Login from "./Authentication/Login";
import Forget from "./Authentication/Forget";
import SuperAdmin from "./Users/SuperAdmin/SuperAdmin";
import Retailer from "./Users/Retailer/Retailer"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/forget" element={<Forget />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
