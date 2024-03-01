import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData ? userData.User_type : null;

  // Define routes that are allowed for the "Retailer" role
  const allowedRoutesForRetailer = [
    "/retailer",
    "/add-customer",
    "/list",
    "/new-entry",
    "/child-entry-list",
    "/mobileupdate",
    "/mobiledata",
     
  ];

  // Define routes that are allowed for the "Admin" and "SuperAdmin" roles
  const allowedRoutesForAdmin = [
    "/superadmin",
    "/adduser",
    "/viewuser",
    "/balance_transfer",
    "/user_limit",
    "/history",
    "/add-customer",
    "/list",
    "/new-entry",
    "/child-entry-list",
    "/mobileupdate",
    "/mobiledata",
    "/adminreport",
    "/viewretaileruserlist",
    "/searchentrydata",
    "/ViewChildData",
    "/editstatus",
  ];
  const allowedRoutesForBackoffice=[
    "/backoffice"
  ]

  // Check if the user is logged in
  if (!userData) {
    return <Navigate to="/" />;
  }

  // Check if the user is a "Retailer"
  if (userRole === "Retailer") {
    const currentRoute = window.location.pathname;
    // If the current route is not allowed for the retailer, redirect to home page
    if (!allowedRoutesForRetailer.includes(currentRoute)) {
      return <Navigate to="/retailer" />;
    }
  }

  // Check if the user is an "Admin" or "SuperAdmin"
  if (userRole === "Superadmin") {
    const currentRoute = window.location.pathname;
    // If the current route is not allowed for the admin, redirect to home page
    if (!allowedRoutesForAdmin.includes(currentRoute)) {
      return <Navigate to="/superadmin" />;
    }
  }
  if (userRole === "BackOffice") {
    const currentRoute = window.location.pathname;
    // If the current route is not allowed for the admin, redirect to home page
    if (!allowedRoutesForBackoffice.includes(currentRoute)) {
      return <Navigate to="/backoffice" />;
    }
  }

  // Render the protected routes
  return <Outlet />;
}

export default Protected;
