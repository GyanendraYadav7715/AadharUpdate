import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Local_Url } from "../../constant/constant";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import { Select } from "../Selection/Select";
import { CustomInput } from "../CustomeInput/CustomInput";
import { toast } from "react-toastify";

const Edit = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const entrytype = searchParams.get("entrytype");
  const apply = searchParams.get("apply");
  const time = searchParams.get("time");
  const type = searchParams.get("type");

  const [formData, setFormData] = useState({
    appliedBy: apply,
    timestamp: time,
    User_type: type,
    entryType: entrytype,
    status: "",
    remarks: "",
  });

  const { remarks, status } = formData;

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (remarks.trim() === "" || status.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/admin/aplStatus`;

      const response = await axios.post(apiUrl, formData);
      toast.success(response.data.message);
      setFormData({
        appliedBy: "",
        timestamp: "",
        User_type: "",
        entryType: "",
        status: "",
        remarks: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong");
    }
  };

  const title = "Edit Customer";
  const links = [
    { title: "Home", href: "/backoffice" },
    { title: "Edit Customer Status" },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} />
      <div className="p-3 sm:ml-64 bg-gray-100">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">Update Customer Status</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start w-full border p-9 rounded-md bg-white"
            >
              <div className="flex justify-between items-center w-full gap-3 p-6">
                <CustomInput
                  onChange={handleInputChange}
                  label="Remark"
                  type="text"
                  value={formData.remarks}
                  name="remarks"
                />

                <Select
                  label="Status"
                  options={[
                    { label: "Select Status", value: "No Status Selected" },
                    { label: "Rejected", value: "Rejected" },
                    { label: "Completed", value: "Completed" },
                  ]}
                  name="status"
                  className="inputField select"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
              <div className="p-3">
                <button
                  className="Submit-button whitespace-nowrap bg-green-600"
                  type="submit"
                >
                  <i className="ri-save-fill"> </i>
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

export default Edit;
