import React, { useState } from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";

const EditStatus = () => {
  const title = "Edit Retailer";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "Edit Retailer Status" },
  ];

  const mylinks = [
    {
      to: "/viewretaileruserlist",
      text: "view Retailer User",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-1 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-gray-300">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">Update Retailer Status</h3>
            <form className="flex flex-col items-start w-full border p-9 rounded-sm bg-white">
              <div className="  w-full">
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Status
                  </label>
                  <select
                    required
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    name="status"
                    // value={formData.status}
                    className="bg-white border text-gray-900 text-sm rounded-sm inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  className="Submit-button whitespace-nowrap bg-green-600"
                  type="submit"
                >
                  <i class="ri-save-fill"> </i>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStatus;
