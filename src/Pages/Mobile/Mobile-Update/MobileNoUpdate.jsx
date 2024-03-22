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

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      DOA: currentDate,
    }));
  }, [currentDate]);

  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.userType;
  }
  const title = "Mobile Update";
  const links = [
    { title: "Home", href: role === "retailer" ? "/retailer" : "/superadmin" },
    { title: "Mobile Update", href: "" },
  ];

  const mylinks = [
    {
      to: "/mobile-list",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];

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
        FingerPrint1: " ",
      },
      {
        FingerPrint2: " ",
      },
      {
        FingerPrint3: " ",
      },
      {
        FingerPrint4: " ",
      },
      {
        FingerPrint5: "",
      },
    ],
  });

  // Function to handle form input changes
  const handleInputChange = (name, value) => {
    console.log(`Handling input for ${name}: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = localStorage.getItem("user");
    const userObj = JSON.parse(data);
    formData.userName = userObj.Username;
    formData.userType = userObj.User_type;
    // Access the role property
    role = userObj.User_type;
    setFormData((prevFormData) => ({
      ...prevFormData,
      DOA: currentDate,
    }));
    console.log(
      setFormData((prevFormData) => ({
        ...prevFormData,
        DOA: currentDate,
      }))
    );

    if (!formData.Name || !formData.Email || !formData.MobileNo) {
      return toast.error("Please fill all the required fields.");
    }

    try {
      // Define the API endpoint URL
      const apiUrl = `${Local_Url}/api/v1/retailer/createMobileUser`;

      const response = await axios.post(apiUrl, formData);

      //console.log("Form submitted successfully:", response.data);
      toast.success(response.data.message);
      // Optionally, reset the form after submission
      setFormData({
        Name: "",
        FatherName: "",
        DOA: "",
        AadhaarNo: "",
        MobileNo: "",
        Email: "",
        FingerPrint: [
          { FingerPrint1: "" },
          { FingerPrint2: "" },
          { FingerPrint3: "" },
          { FingerPrint4: "" },
          { FingerPrint5: "" },
        ],
      });
    } catch (error) {
      // Handle submission error
      //console.error("Error submitting form:", error.message);
      toast.error(error.response.data.message)
    }
  };

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
              type="text"
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
              type="number"
              name="AadhaarNo"
              placeholder="Aadhaar No."
              value={formData.AadhaarNo}
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
