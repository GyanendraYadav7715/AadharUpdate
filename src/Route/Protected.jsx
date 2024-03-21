import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData ? userData.User_type : null;

  const allowedRoutes = {
    Retailer: [
      "/retailer",
      "/add-customer",
      "/list",
      "/new-entry",
      "/ViewChildData",
      "/mobile-list",
      "/mobileupdate",
    ],
    Superadmin: [
      "/superadmin",
      "/balance_transfer",
      "/user_limit",
      "/history",
      "/adduser",
      "/viewuser",
      "/viewretaileruserlist",
      "/add-customer",
      "/list2",
      "/searchentrydata",
      "/new-entry",
      "/child-entry-list",
      "/ViewChildData",
      "/mobileupdate",
      "/mobile-list",
      "/adminreport",
      "/user-edit",
      "/user-finger",
      "/edit-view",
    ],
    BackOffice: [
      "/backoffice",
      "/list2",
      "/child-entry-list",
      "/adminreport",
      "/user-edit",
      "/user-finger",
      "/edit-view",
    ],
  };

  if (!userData) {
    return <Navigate to="/" />;
  }

  const allowedRoutesForUserRole = allowedRoutes[userRole];
  const currentRoute = window.location.pathname;

  if (
    !allowedRoutesForUserRole ||
    !allowedRoutesForUserRole.includes(currentRoute)
  ) {
    // Redirect to home page for invalid routes
    return <Navigate to={`/${userRole.toLowerCase()}`} />;
  }

  return <Outlet />;
}

export default Protected;
