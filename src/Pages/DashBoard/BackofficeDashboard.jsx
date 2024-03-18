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
          <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4 flex justify-center items-center">
              <h1 className="text-2xl font-bold">
                Welcome To Main Admin Panel - Back Office
              </h1>
            </header>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackofficeDashboard;
