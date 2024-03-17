import React, { useState } from "react";
import axios from "axios";
import { Local_Url } from "../constant/constant";
import Breadcrumb from "../Components/BreadCrumb/Breadcrumb";
import { Select } from "../Components/Selection/Select";
import {CustomInput} from "../Components/CustomeInput/CustomInput";
const Edit = () => {
  const [formData, setFormData] = useState({
    Remark: "",
    Status: "",
    User_type: "",
  });

  const {Remark,Status } = formData;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any input field is empty
    if (Remark.trim() === "" || Status.trim() === "") {
      alert("Please fill the all fields");
      return;
    }

    try {
      const apiUrl = `${Local_Url} `;
       
        await axios.post(apiUrl, formData);

    
      setFormData({
        Username: "",
        amount: "",
      });
    } catch (error) {
       
      console.error("Error:", error.message);
      alert("Something went worng");
    }
  };
  const title = "Edit Customer";
  const links = [
    { title: "Home", href: "/backoffice" },
    { title: "Edit Customer Status" },
  ];

  const mylinks = [
    {
      to: "/viewuser",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];
  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
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
                  onChange={handleChange}
                  label="Remark"
                  type="text"
                  value={formData.Remark}
                  name="Remark"
                  placeholder=""
                />
                <Select
                  label="Status"
                  options={[
                    { label: "Select Status", value: "No Status Selected" },
                    { label: "Rejected", value: "Rejected" },
                    { label: "Compeleted", value: "Compeleted" },
                  ]}
                  name="SelectedParent"
                  className="inputField select"
                  type="text"
                  value={formData.Status}
                  onChange={handleChange}
                />
              </div>
              <div className="p-3">
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

export default Edit;
