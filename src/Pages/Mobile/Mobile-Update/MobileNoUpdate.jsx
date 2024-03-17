import axios from "axios";
import "./mobileUpdate.css";
import { useState } from "react";
import Box from "../../../Components/FingerPrint/FingerPrint";
import {CustomInput2} from "../../../Components/CustomeInput/CustomInput"
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";

export const Input = ({ label, type, name, placeholder, onChange, value }) => {
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
      />
    </div>
  );
};
const MobileNoUpdate = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }
  const title = "Mobile Update";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "Mobile Update", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "Mobile Update", href: "" },
        ];

  const mylinks = [
    {
      to: "/mobileupdate",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    dateofapply: "",
    email: "",
    mobile: "",

    aadhaar: "",
    address: "",
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
  console.log(formatCurrentDate);

  // Function to handle form input changes
  const handleInputChange = (name, value) => {
    console.log(`Handling input for ${name}: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
      createdOn: formatCurrentDate(),
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.purpose || !formData.email || !formData.mobile) {
      return alert("please filll the blank field first");
    }

    try {
      // Define the API endpoint URL
      const apiUrl = "http://localhost:4001/Products";

      // Make a POST request using Axios
      const response = await axios.post(apiUrl, formData);

      // Handle successful response
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully:");
      // Optionally, reset the form after submission
      setFormData({
        name: "",
        dateofbirth: "",
        email: "",
        mobile: "",

        aadhaar: "",
        address: "",
        fathern: "",
      });
    } catch (error) {
      // Handle submission error
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-2 border-2 rounded-lg  shadow-xl bg-white">
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
              type="date"
              label="Date of Apply"
              name={formatCurrentDate}
              placeholder={formatCurrentDate}
              value={formData.dateofapply}
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
          </div>
          <div className="container grid grid-cols-5 gap-3">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <button onClick={handleSubmit} className="Submit-button">
              {" "}
              <i class="ri-save-fill"> </i>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNoUpdate;
