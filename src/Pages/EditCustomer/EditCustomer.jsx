import axios from "axios";
import React, { useState } from "react";
import { Local_Url } from "../../constant/constant";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import { CustomInput } from "../../Components/CustomeInput/CustomInput";
import { CustomInput2 } from "../../Components/CustomeInput/CustomInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditCustomer = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData.User_type;

  const title = "Edit Customer";
  const links =
    role === "Superadmin"
      ? [{ title: "Home", href: "/superadmin" }, { title: "Edit Customer" }]
      : role === "Retailer"
      ? [{ title: "Home", href: "/reatiler" }, { title: "Edit Customer" }]
      : [{ title: "Home", href: "/backoffice" }, { title: "Edit Customer" }];
  const mylinks = [
    {
      to: "/viewuser",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];
  const [formData, setFormData] = useState({
    appliedBy: "",
    timestamp: "",
    entryType: "",
    Name: "",
    FatherName: "",
    DOB: "",
    AadhaarNo: "",
    MobileNo: "",
    Email: "",
    Purpose: "",
  });
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
      createdOn: formatCurrentDate(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = localStorage.getItem("user");
    // const userObj = JSON.parse(data);
    // formData.userName = userObj.Username;
    // formData.userType = userObj.User_type;
    // // Access the role property
    // role = userObj.User_type;

    if (
      !formData.Name ||
      !formData.Email ||
      !formData.MobileNo ||
      formData.FatherName
    ) {
      return toast.error("Please fill all the required fields.");
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/admin/editRetailerUser`;

      const response = await axios.post(apiUrl, formData);

      //console.log("Form submitted successfully:", response.data);
      toast.success(response.data.message);

      setFormData({
        appliedBy: "",
        timestamp: "",
        entryType: "",
        Name: "",
        FatherName: "PP",
        DOB: "",
        AadhaarNo: "",
        MobileNo: "",
        Email: "",
        Purpose: "PP",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <h3 className="text-2xl font-semibold ml-3 mb-3">Edit Customer</h3>
          <div className="px-3 py-4 m-2  shadow-sm rounded-md bg-white border-[#00000047] border-2 ">
            <div className="formGrid">
              <CustomInput
                onChange={handleInputChange}
                label="Full Name"
                type="text"
                value={formData.Name}
                name="Name"
                placeholder="Full Name"
              />
              <CustomInput
                onChange={handleInputChange}
                label="Date of Birth"
                type="date"
                name="DOB"
                placeholder=""
                value={formData.DOB}
              />
              <CustomInput2
                label="Aadhaar No."
                type="tel"
                name="AadhaarNo"
                placeholder="hfhfhfhfh"
                disabled
              />
              <CustomInput
                onChange={handleInputChange}
                label="Mobile No."
                type="text"
                name="MobileNo"
                placeholder="Mobile No."
                value={formData.MobileNo}
                maxLength={10}
              />
              <CustomInput
                onChange={handleInputChange}
                label="E-mail ID"
                type="email"
                name="Email"
                placeholder="example@update.com"
                value={formData.Email}
              />
              <CustomInput
                onChange={handleInputChange}
                label="Purpose"
                type="text"
                name="Purpose"
                value={formData.Purpose}
                placeholder="Enter Purpose"
                required
              />
              <button onClick={handleSubmit} className="Submit-button">
                <i className="ri-save-fill"></i> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
