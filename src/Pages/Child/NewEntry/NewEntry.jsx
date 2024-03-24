import React, { useState } from "react";
import axios from "axios";
import Box from "../../../Components/FingerPrint/FingerPrint";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { CustomInput } from "../../../Components/CustomeInput/CustomInput";
import Information from "../../../Components/Information/Information";
import { Select } from "../../../Components/Selection/Select";
import { Local_Url } from "../../../constant/constant";
import FileUpload from "../../../Components/FileUpload/FileUpload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChlidEntry = () => {
  // Initialize state for form data
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
    Proof: [{ POI: "", POB: "", POA: "" }],
    FingerPrint: [
      {
        FingerPrint1: "HH",
        FingerPrint2: "HH",
        FingerPrint3: "HH",
        FingerPrint4: "HH",
        FingerPrint5: "HH",
      },
    ],
  });

  // Function to format current date
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

  // Handle input change for form fields
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
      createdOn: formatCurrentDate(),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.Name ||
      !formData.Parent_AadhaarNo ||
      !formData.Email ||
      !formData.MobileNo
    ) {
      return toast.error("Please fill all the required fields.");
    }

    try {
      // Get user data from local storage
      const userData = JSON.parse(localStorage.getItem("user"));
      formData.userName = userData.Username;
      formData.userType = userData.User_type;

      // Make API request
      const apiUrl = `${Local_Url}/api/v1/retailer/create-child-user`;
      const response = await axios.post(apiUrl, formData);

      // Show success message
      toast.success(response.data.message);

      //After successs reload the page
      setTimeout(() => {
        window.location.reload();
      }, 100);

      // Reset form data
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
        Proof: [{ POI: "", POB: "", POA: "" }],
        FingerPrint: [
          {
            FingerPrint1: "",
            FingerPrint2: "",
            FingerPrint3: "",
            FingerPrint4: "",
            FingerPrint5: "",
          },
        ],
      });
    } catch (error) {
      // Show error message
      toast.error(error.response.data.message);
    }
  };
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData.User_type;

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
      to: "/ViewChildData",
      text: "View Child",
      icon: "ri-team-line text-white text-2xl",
    },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      <div className="p-4 sm:ml-64 ">
        <div className="p-2 border-2 rounded-lg  shadow-xl bg-white">
          <h3 className="text-2xl font-semibold ml-3 mb-3">Add Child</h3>
          <div className="px-3 py-4 m-2  shadow-sm rounded-md bg-white border-[#00000047] border-2 ">
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
                type="aadhar"
                name="Parent_AadhaarNo"
                placeholder="Father / Mother Aadhaar No"
                value={formData.Parent_AadhaarNo}
                maxLength={12}
              />
              <FileUpload
                title="Upload Child Photo Pdf*"
                name="POI"
                onFileUpload={(imageUrl) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    Proof: {
                      ...prevFormData.Proof,
                      POI: imageUrl,
                    },
                  }))
                }
              />
              <FileUpload
                title="Upload Birth Proof (Only Pdf allow)"
                name="POB"
                onFileUpload={(imageUrl) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    Proof: {
                      ...prevFormData.Proof,
                      POB: imageUrl,
                    },
                  }))
                }
              />
              <FileUpload
                title="Upload Form"
                name="POA"
                onFileUpload={(imageUrl) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    Proof: {
                      ...prevFormData.Proof,
                      POA: imageUrl,
                    },
                  }))
                }
              />
              <CustomInput
                label="Mobile No."
                onChange={handleInputChange}
                type="tel"
                value={formData.MobileNo}
                name="MobileNo"
              />
              <CustomInput
                onChange={handleInputChange}
                label="E-mail ID"
                type="email"
                name="Email"
                placeholder="example@update.com"
                value={formData.Email}
                maxLength={50}
              />

              <CustomInput
                onChange={handleInputChange}
                label="Address"
                type="text"
                name="Address"
                placeholder="House No, Village, City Name, District, State"
                value={formData.Address}
              />
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

            <div className="container grid grid-cols-5 p-5">
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
      </div>
    </>
  );
};

export default ChlidEntry;
