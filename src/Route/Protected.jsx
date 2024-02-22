import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData ? userData.role : null;

  // Define routes that are allowed for the "Retailer" role
  const allowedRoutesForRetailer = [
    "/retailer",
    "/add-customer",
    "/list",
    "/new-entry",
    "/child-entry-list",
    "/mobileupdate",
    "/mobiledata",
    "/adminreport",
  ];

  // Define routes that are allowed for the "Admin" and "SuperAdmin" roles
  const allowedRoutesForAdmin = [
    "/superadmin",
    "/adduser",
    "/viewuser",
    "/balance",
    "/history",
    "/add-customer",
    "/list",
    "/new-entry",
    "/child-entry-list",
    "/mobileupdate",
    "/mobiledata",
    "/adminreport",
    "/viewretaileruserlist"
  ];

  // Check if the user is logged in
  if (!userData) {
    return <Navigate to="/" />;
  }

  // Check if the user is a "Retailer"
  if (userRole === "Retailer") {
    const currentRoute = window.location.pathname;
    // If the current route is not allowed for the retailer, redirect to home page
    if (!allowedRoutesForRetailer.includes(currentRoute)) {
      return <Navigate to="/" />;
    }
  }

  // Check if the user is an "Admin" or "SuperAdmin"
  if (userRole === "Admin") {
    const currentRoute = window.location.pathname;
    // If the current route is not allowed for the admin, redirect to home page
    if (!allowedRoutesForAdmin.includes(currentRoute)) {
      return <Navigate to="/" />;
    }
  }

  // Render the protected routes
  return <Outlet />;
}

export default Protected;
