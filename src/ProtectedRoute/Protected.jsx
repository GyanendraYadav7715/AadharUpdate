import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const userData = localStorage.getItem("user");

  return userData ? <Outlet /> : <Navigate to="/" />;
}

export default Protected;
