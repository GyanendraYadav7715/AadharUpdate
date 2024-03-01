import React from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
const SearchEntrydata = () => {
  const title = "View Customers Data";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "View Customers Data" },
  ];

  const mylinks = [
    {
      to: "/add-customer",
      text: "Create New ",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">
            Search And View Customer Date-Wise
          </h3>
          <form className="flex flex-col items-start w-full border p-9 rounded-sm bg-white mt-5">
            <div className="flex justify-between items-center w-full">
              <div className="mb-5 w-1/2 p-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  From Date
                </label>
                <input
                  type="date"
                  id="username"
                  className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-5 w-1/2 p-6">
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  TO Date
                </label>
                <input
                  type="date"
                  id="amount"
                  className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Amount"
                  required
                />
              </div>
            </div>
            <div className="p-6">
              <button className="Submit-button whitespace-nowrap">
                <i class="ri-save-fill"> </i>
                Get Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchEntrydata;
