import React, { useState } from "react";
import axios from "axios";
import Box from "../../../Components/FingerPrint/FingerPrint";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import {CustomInput} from "../../../Components/CustomeInput/CustomInput";
import Information from "../../../Components/Information/Information";
import { Select } from "../../../Components/Selection/Select";
import { Local_Url } from "../../../constant/constant";

const NewEntry = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    const userObj = JSON.parse(userData);
    role = userObj.role;
  }

  const title = "Child Enrollment System";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "Child Enrollment System", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "Child Enrollment System", href: "" },
        ];

  const mylinks = [
    {
      to: "/child-entry-list",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl",
    },
  ];

  const [formData, setFormData] = useState({
    Name: "",
    SelectedParent: "",
    ParentName: "",
    DOB: "",
    Gender: "",
    Parent_AadhaarNo: "",
    MobileNo: "",
    Email: "",
    Address: "",
    userName: "",
    userType: "retailer",
    Proof: [{ POI: "" }, { POB: "" }, { POA: "" }],
    FingerPrint: [
      { FingerPrint1: "" },
      { FingerPrint2: "" },
      { FingerPrint3: "" },
      { FingerPrint4: "" },
      { FingerPrint5: "" },
    ],
  });

  const formatCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
      createdOn: formatCurrentDate(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = localStorage.getItem("user");
    const userObj = JSON.parse(data);
    formData.userName = userObj.Username;
    formData.userType = userObj.User_type;
    role = userObj.User_type;

    if (!formData.Name || !formData.Email || !formData.MobileNo) {
      return alert("Please fill all the required fields.");
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/retailer/create-child-user`;
      const response = await axios.post(apiUrl, formData);
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully.");
      setFormData({
        ...formData,
        Name: "",
        SelectedParent: "",
        ParentName: "",
        DOB: "",
        Gender: "",
        Parent_AadhaarNo: "",
        MobileNo: "",
        Email: "",
        Address: "",
        userName: "",
        userType: "retailer",
        Proof: [{ POI: "" }, { POB: "" }, { POA: "" }],
        FingerPrint: [
          { FingerPrint1: "" },
          { FingerPrint2: "" },
          { FingerPrint3: "" },
          { FingerPrint4: "" },
          { FingerPrint5: "" },
        ],
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Error submitting form. Please try again later.");
    }
  };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-2 border-2 rounded-lg  shadow-xl bg-white">
          <Information />

          <div className="formGrid">
            <CustomInput
              onChange={handleInputChange}
              label="Child Name"
              type="text"
              value={formData.Name}
              name="Name"
              placeholder="Full Name"
            />

            <CustomInput
              onChange={handleInputChange}
              label="Father Name / Mother Name"
              type="text"
              value={formData.ParentName}
              name="ParentName"
              placeholder="Enter Parents Name"
            />

            <CustomInput
              onChange={handleInputChange}
              label="Date of Birth"
              type="date"
              name="DOB"
              placeholder=""
              value={formData.DOB}
            />

            {/* Hindi Name  */}
            <CustomInput
              onChange={handleInputChange}
              type="text"
              value={formData.name_in_hindi}
              name="name_in_hindi"
              placeholder="बच्चे का नाम हिंदी में डालें"
            />

            <CustomInput
              onChange={handleInputChange}
              type="text"
              value={formData.Parent_name_in_hindi}
              name="Parent_name_in_hindi"
              placeholder="माता-पिता का नाम हिन्दी में डालें"
            />

            {/* For Empty Space in  Spacific row */}
            <div className="empty-space"></div>

            <Select
              label="Child Gender"
              options={[
                { label: "Select Gender", value: "No Gender Selected" },
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              name="Gender"
              className="inputField select"
              type="text"
              value={formData.Gender}
              onChange={handleInputChange}
            />

            {/* Parent Selection */}

            <Select
              label="Select Parent"
              options={[
                { label: "Select Parent", value: "No Parent Selected" },
                { label: "Father", value: "Father" },
                { label: "Mother", value: "Mother" },
              ]}
              name="SelectedParent"
              className="inputField select"
              type="text"
              value={formData.SelectedParent}
              onChange={handleInputChange}
            />

            <CustomInput
              onChange={handleInputChange}
              label="Father / Mother Aadhaar No"
              type="number"
              name="Parent_AadhaarNo"
              placeholder="Father / Mother Aadhaar No"
              value={formData.Parent_AadhaarNo}
              maxLength={12}
            />

            {/* Document Upload Inputs */}
            <CustomInput
              onChange={handleInputChange}
              label="Upload Birth Proof (Only Pdf allow)"
              type="file"
              name="POB"
              placeholder=""
              value={formData.POB}
            />
            <CustomInput
              onChange={handleInputChange}
              label="Upload Child Photo Pdf*"
              type="file"
              name="POI"
              placeholder=""
              value={formData.POI}
            />
            <CustomInput
              onChange={handleInputChange}
              label="Upload Form"
              type="file"
              name="POA"
              placeholder=""
              value={formData.POA}
            />

            <CustomInput
              onChange={handleInputChange}
              label="Mobile No."
              type="text"
              name="MobileNo"
              placeholder="Mobile No."
              value={formData.MobileNo}
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
              label="Address"
              type="text"
              name="Address"
              placeholder="House No, Village, City Name, District, State"
              value={formData.Address}
            />

            {/* For Empty Space in  Spacific row */}

            <div className="empty-space"></div>

            <div className="empty-space"></div>

            <CustomInput
              onChange={handleInputChange}
              type="text"
              name="Address_in_hindi"
              placeholder="पता हिन्दी में डालें"
              value={formData.Address_in_hindi}
            />
          </div>

          <div className="container grid grid-cols-5">
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                onFingerprintUpload={(imageUrl) =>
                  setFormData({
                    ...formData,
                    FingerPrint: {
                      ...formData.FingerPrint,
                      [`FingerPrint${index + 1}`]: imageUrl,
                    },
                  })
                }
              />
            ))}
            <button onClick={handleSubmit} className="Submit-button">
              <i class="ri-save-fill"> </i>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewEntry;
