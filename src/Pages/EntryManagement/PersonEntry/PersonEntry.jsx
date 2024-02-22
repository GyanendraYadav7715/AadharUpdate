import axios from "axios";
import React, { useState } from "react";
import "./PersonEntry.css";
import Box from "../../../Components/FingerPrint/FingerPrint";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
 

export const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  required,
}) => {
  return (
    <div className="inputContainer">
      <div className="inputWrapper">
        <label htmlFor={name} className="label">
          {label}
        </label>
      </div>
      <input
        name={name}
        type={type}
        className="inputField"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required={required} // Changed require to required
      />
    </div>
  );
};

const PersonEntry = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }
  const title = "Add Customer";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "Add Customer", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "Add Customer", href: "" },
        ];
  const mylinks = [
    {
      to: "/list",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    dateofbirth: "",
    email: "",
    mobile: "",
    purpose: "",
    aadhaar: "",
    address: "",
    fathern: "", // Added fathern property
  });

  const formatCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
    return formattedDate;
  };

  const handleInputChange = (name, value) => {
    console.log(`Handling input for ${name}: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
      createdOn: formatCurrentDate(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.purpose || !formData.email || !formData.mobile) {
      return alert("Please fill all the required fields");
    }

    try {
      const apiUrl = "http://localhost:4001/Products";
      const response = await axios.post(apiUrl, formData);
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully:");
      setFormData({
        name: "",
        dateofbirth: "",
        email: "",
        mobile: "",
        purpose: "",
        aadhaar: "",
        address: "",
        fathern: "", // Reset fathern property
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <>
     
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      <div className=" p-3 sm:ml-64 bg-gray-200">
        <div className="p-2 border-2 rounded-lg shadow-xl bg-white">
          <div className="PurposeGrid">
            <Input
              onChange={handleInputChange}
              label="Purpose"
              type="text"
              name="purpose"
              value={formData.purpose}
              placeholder="Enter Purpose"
              required // Removed "require"
            />
          </div>
          <div className="formGrid">
            <Input
              onChange={handleInputChange}
              label="Full Name"
              type="text"
              value={formData.name}
              name="name"
              placeholder="Enter Name"
            />
            <Input
              onChange={handleInputChange}
              label="Father Name"
              type="text"
              value={formData.fathern}
              name="fathern"
              placeholder="Father Name"
            />
            <Input
              onChange={handleInputChange}
              label="Date of Birth"
              type="date"
              name="dateofbirth"
              placeholder=""
              value={formData.dateofbirth}
            />
            <Input
              onChange={handleInputChange}
              label="Aadhaar No."
              type="number"
              name="aadhaar"
              placeholder="Aadhaar No."
              value={formData.aadhaar}
            />
            <Input
              onChange={handleInputChange}
              label="Mobile No."
              type="text"
              name="mobile"
              placeholder="Mobile No."
              value={formData.mobile}
            />
            <Input
              onChange={handleInputChange}
              label="E-mail ID"
              type="email"
              name="email"
              placeholder="example@update.com"
              value={formData.email}
            />
            <Input
              onChange={handleInputChange}
              label="POI"
              type="file"
              name="file"
              placeholder=""
            />
            <Input
              onChange={handleInputChange}
              label="POA"
              type="file"
              name="POA"
              placeholder=""
              value={formData.POA}
            />
            <Input
              onChange={handleInputChange}
              label="POB"
              type="file"
              name="POB"
              placeholder=""
              value={formData.POB}
            />
          </div>
          <div className="PurposeGrid Address">
            <Input
              onChange={handleInputChange}
              label="Address"
              type="text"
              name="address"
              placeholder="House No, Village, City Name, District, State"
              value={formData.address}
            />
          </div>

          <div className="container grid grid-cols-5">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <button onClick={handleSubmit} className="Submit-button">
              <i className="ri-save-fill"></i> Submit
            </button>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default PersonEntry;
