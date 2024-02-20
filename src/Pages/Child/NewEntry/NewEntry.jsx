import axios from "axios";
import "./newEntry.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "../../../Components/FingerPrint/FingerPrint";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import HeaderNavbar from "../../../Components/HeaderNabar/HeaderNavbar";
import Asidebar from "../../../Components/Asidebar/Asidebar";
import Information from "../../../Components/Information/Information";
import Footer from "../../../Components/Footer/Footer";

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

//Manage Select Box
export const Select = ({
  label,
  value,
  options,
  onChange,
  name,
  className,
}) => {
  return (
    <div className="inputContainer">
      <div className="inputWrapper">
        <label htmlFor={name} className="label">
          {label}
        </label>
      </div>
      <select
        value={value}
        onChange={onChange}
        className={className}
        name={name}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

const NewEntry = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
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
      icon: "ri-team-line text-white text-2xl ",
    },
  ];

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    dateofbirth: "",
    email: "",
    mobile: "",
    purpose: "",
    aadhaar: "",
    address: "",
    Gender: "",
    Parent_aadhaar: "",
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
        purpose: "",
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
      <Asidebar />
      <HeaderNavbar />
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-2 border-2 rounded-lg  shadow-xl bg-white">
          <Information />

          <div className="formGrid">
            <Input
              onChange={handleInputChange}
              label="Child Name"
              type="text"
              value={formData.name}
              name="name"
              placeholder="Full Name"
            />

            <Input
              onChange={handleInputChange}
              label="Father Name / Mother Name"
              type="text"
              value={formData.Parent_name}
              name="Parent_name"
              placeholder="Enter Parents Name"
            />

            <Input
              onChange={handleInputChange}
              label="Date of Birth"
              type="date"
              name="DOB"
              placeholder=""
              value={formData.DOB}
            />

            {/* Hindi Name  */}
            <Input
              onChange={handleInputChange}
              type="text"
              value={formData.name_in_hindi}
              name="name_in_hindi"
              placeholder="बच्चे का नाम हिंदी में डालें"
            />

            <Input
              onChange={handleInputChange}
              type="text"
              value={formData.Parent_name_in_hindi}
              name="Parent_name_in_hindi"
              placeholder="माता-पिता का नाम हिन्दी में डालें"
            />

            {/* For Empty Space in  Spacific row */}
            <div className="empty-space"></div>

            {/* Selction Input */}

            {/* Gender Selection */}

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
              name="Parent_aadhaar"
              className="inputField select"
              type="text"
              value={formData.Parent_aadhaar}
              onChange={handleInputChange}
            />

            <Input
              onChange={handleInputChange}
              label="Father / Mother Aadhaar No"
              type="number"
              name="Parent_aadhaar"
              placeholder="Father / Mother Aadhaar No"
              value={formData.aadhaar}
            />

            {/* Document Upload Inputs */}
            <Input
              onChange={handleInputChange}
              label="Upload Birth Proof (Only Pdf allow)"
              type="file"
              name="DOB_Proof"
              placeholder=""
              value={formData.DOB_Proof}
            />
            <Input
              onChange={handleInputChange}
              label="Upload Child Photo Pdf*"
              type="file"
              name="Child_Photo"
              placeholder=""
              value={formData.Child_Photo}
            />
            <Input
              onChange={handleInputChange}
              label="Upload Form"
              type="file"
              name="Form"
              placeholder=""
              value={formData.Form}
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
              label="Address"
              type="text"
              name="address"
              placeholder="House No, Village, City Name, District, State"
              value={formData.address}
            />

            {/* For Empty Space in  Spacific row */}

            <div className="empty-space"></div>

            <div className="empty-space"></div>

            <Input
              onChange={handleInputChange}
              type="text"
              name="Address_in_hindi"
              placeholder="पता हिन्दी में डालें"
              value={formData.Address_in_hindi}
            />
          </div>

          <div className="container grid grid-cols-5">
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
      <Footer />
    </>
  );
};

export default NewEntry;
