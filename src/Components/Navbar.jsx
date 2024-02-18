import React from "react";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <h1>{data === "Admin Login" ? "Admin Dashboard" : "User Dashboard"}</h1>

      <button onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default Navbar;
