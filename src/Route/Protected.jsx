import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData ? userData.User_type : null;

  // Define routes allowed for different roles
  const allowedRoutes = {
    Retailer: [
      "/retailer",
      "/add-customer",
      "/list",
      "/new-entry",
      "/child-entry-list",
      "/mobileupdate",
      "/mobiledata",
    ],
    Superadmin: [
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
    ],
    BackOffice: ["/backoffice", "/list", "/ViewChildData", "/adminreport"],
  };

  // Check if the user is logged in
  if (!userData) {
    return <Navigate to="/" />;
  }

  // Check if the current route is allowed for the user's role
  const allowedRoutesForUserRole = allowedRoutes[userRole];
  const currentRoute = window.location.pathname;

  if (
    !allowedRoutesForUserRole ||
    !allowedRoutesForUserRole.includes(currentRoute)
  ) {
    // Redirect to home page for invalid routes
    return <Navigate to={`/${userRole.toLowerCase()}`} />;
  }

  // Render the protected routes
  return <Outlet />;
}

export default Protected;
