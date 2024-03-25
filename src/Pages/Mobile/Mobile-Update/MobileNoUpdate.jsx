import axios from "axios";
import React, { useState, useEffect } from "react";
import "./mobileUpdate.css";
import { Local_Url } from "../../../constant/constant";
import Box from "../../../Components/FingerPrint/FingerPrint";
import { CustomInput } from "../../../Components/CustomeInput/CustomInput";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MobileNoUpdate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Get the current date in the format YYYY-MM-DD
    const date = new Date().toISOString().split("T")[0];
    setCurrentDate(date);
  }, []);

  // State to manage form data
  const [formData, setFormData] = useState({
    Name: "",
    FatherName: "",
    DOA: currentDate,
    AadhaarNo: "",
    MobileNo: "",
    Email: "",
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

  //set the current date int te formdata
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      DOA: currentDate,
    }));
  }, [currentDate]);

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

  // Function to handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
      createdOn: formatCurrentDate(),
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Name || !formData.Email || !formData.MobileNo) {
      return toast.error("Please fill all the required fields.");
    }

    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));
      formData.userName = userData.Username;
      formData.userType = userData.User_type;

      const apiUrl = `${Local_Url}/api/v1/retailer/createMobileUser`;
      const response = await axios.post(apiUrl, formData);

      toast.success(response.data.message);

      // Reload the page after successful submission
      setTimeout(() => {
        window.location.reload();
      }, 100);

      // Reset form data
      setFormData({
        ...formData,
        Name: "",
        FatherName: "",
        AadhaarNo: "",
        MobileNo: "",
        Email: "",
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
      // Handle submission error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while submitting the form.");
      }
    }
  };
  const userData = JSON.parse(localStorage.getItem("user"));
  let role = userData.userType;

  const title = "Mobile Update";
  const links = [
    { title: "Home", href: role === "retailer" ? "/retailer" : "/superadmin" },
    { title: "Mobile Update" },
  ];

  const mylinks = [
    {
      to: "/mobile-list",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-2 border-2 rounded-lg  shadow-xl bg-white">
          <div className="formGrid">
            <CustomInput
              onChange={handleInputChange}
              label="Full Name"
              type="text"
              value={formData.Name}
              name="Name"
              placeholder="Enter Name"
            />
            <CustomInput
              onChange={handleInputChange}
              label="Father Name"
              type=""
              value={formData.FatherName}
              name="FatherName"
              placeholder="Father Name"
            />
            <div className="inputContainer">
              <div className="inputWrapper">
                <label className="label">Date of Apply</label>
              </div>
              <input
                type="date"
                value={currentDate}
                disabled
                onChange={(e) => setCurrentDate(e.target.value)}
                className="inputField"
              />
            </div>

            <CustomInput
              onChange={handleInputChange}
              label="Aadhaar No."
              type="aadhar"
              name="AadhaarNo"
              placeholder="Aadhaar No."
              value={formData.AadhaarNo}
              maxLength={12}
            />
            <CustomInput
              onChange={handleInputChange}
              label="Mobile No."
              type="tel"
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
              maxLength={50}
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
              <i className="ri-save-fill"></i>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNoUpdate;
