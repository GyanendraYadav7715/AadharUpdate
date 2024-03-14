import React from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
const title = "Dashboard";
const links = [
  { title: "Home", href: "/backoffice" },
  { title: "Dashboard", href: "/backoffice" },
  { title: "Back Office" },
];
const BackofficeDashboard = () => {
  return (
    <div>
      <Breadcrumb title={title} links={links} />
      <div className="p-4 sm:ml-64 bg-gray-200 mb-20">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <h1>Welcome To Main Admin Panel - Back Office</h1>
        </div>
      </div>
    </div>
  );
};

export default BackofficeDashboard;
