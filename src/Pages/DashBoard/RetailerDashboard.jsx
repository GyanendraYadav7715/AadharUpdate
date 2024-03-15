import React from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";

const DashBoard = () => {
  const title = "Dashboard";
  const links = [
    { title: "Home", href: "/retailer" },
    { title: "Dashboard", href: "/retailer" },
    { title: "Reatiler" },
  ];
  const mylinks = [
    {
      to: "/mobileupdate",
      text: " Mobile Entry",
      icon: "ri-add-line text-white text-2xl ",
    },
    {
      to: "/add-customer",
      text: " Demographic Enry",
      icon: "ri-add-line text-white text-2xl ",
    },
    {
      to: "/new-entry",
      text: " Child entry",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      <div className="p-1 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-gray-300">
          

          {/* Demographic System Management */}

          <div>
            <div className="flex items-center justify-center h-20 mb-4 rounded bg-white border-1">
              <p className="text-3xl  text-black  font-semibold">
                Demographic System Management
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col  items-center justify-center rounded  bg-yellow-500  h-32  ">
                <h4 className="text-white">102</h4>
                <p className="text-2xl  text-white ">Total Applications</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded bg-green-500  h-32  ">
                <h4 className="text-white">0</h4>
                <p className="text-2xl  text-white ">Total Completed</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded bg-red-500  h-32 mb-5 ">
              <h4 className="text-white">0</h4>
              <p className="text-2xl  text-white ">Total Rejected</p>
            </div>
          </div>
          {/* Child System Management */}
          <div>
            <div className="flex items-center justify-center h-20 mb-4 rounded bg-white border-b-1">
              <p className="text-3xl  text-black  font-semibold  ">
                Child System Management
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center justify-center rounded  bg-yellow-500  h-32  ">
                <h4 className="text-white">166</h4>
                <p className="text-2xl  text-white  ">
                  Total Child Applications
                </p>
              </div>
              <div className="flex flex-col items-center justify-center rounded bg-green-500  h-32  ">
                <h4 className="text-white">22</h4>
                <p className="text-2xl  text-white  ">Total Child Completed</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded bg-red-500  h-32 mb-5 ">
              <h4 className="text-white">2</h4>
              <p className="text-2xl  text-white  ">Total Child Rejected</p>
            </div>
            {/* Mobile System Management */}
            <div>
              <div className="flex items-center justify-center h-20 mb-4 rounded bg-white border-1">
                <p className="text-3xl  text-black font-semibold  ">
                  Mobile System Management
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center justify-center rounded  bg-yellow-500  h-32  ">
                  <h4 className="text-white">112</h4>
                  <p className="text-2xl  text-white  ">
                    Total Mobile Applications
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center rounded bg-green-500  h-32  ">
                  <h4 className="text-white">55</h4>
                  <p className="text-2xl  text-white  ">
                    Total Mobile Completed
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded bg-red-500  h-32 mb-5 ">
                <h4 className="text-white">4</h4>
                <p className="text-2xl text-white">Total Mobile Rejected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
