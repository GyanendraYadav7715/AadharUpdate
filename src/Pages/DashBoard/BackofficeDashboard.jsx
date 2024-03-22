import React from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
const title = "Dashboard";
const links = [
  { title: "Home", href: "/backoffice" },
  { title: "Dashboard", href: "/backoffice" },
  { title: "Back Office" },
];

function Dashboard() {
  return (
    <>
      <Breadcrumb title={title} links={links} />
    <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4 flex justify-center items-center rounded-md">
              <h1 className="text-2xl font-bold">
                Welcome To Main Admin Panel - Back Office
              </h1>
            </header>
            <main className="flex-grow overflow-auto p-4">
               
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
