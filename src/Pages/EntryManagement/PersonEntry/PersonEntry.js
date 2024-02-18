import axios from "axios";
import "./PersonEntry.css";
import { useState } from "react";
import Box from "../FingerPrint/FingerPrint";
import { generateContainerStyles } from "../../utils/GenerateContainer";

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
const PersonEntry = ({collapsed}) => {
  
   const containerStyle = generateContainerStyles(collapsed);
  const imageUrl = require("../../assets/icons/finger.jpg");
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    dateofbirth: "",
    email: "",
    mobile: "",
    purpose: "",
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
      {/* <div className="first-half">
        <div className="title-section">
          <p className="dashboard">Add Customer</p>
          <div className="breadcrumb">
            <Breadcrumbs />
          </div>
        </div>

        <div className="button-section">
          <i class="ri-team-fill plus"></i>
          <Link to="/list">
            <button className="custom-button">View Customers</button>
          </Link>
        </div>
      </div>
 */}

      <div className="hero-section" style={containerStyle}>
        <div className="formContainer">
          <div className="PurposeGrid ">
            <Input
              onChange={handleInputChange}
              label="Purpose"
              type="text"
              name="purpose"
              value={formData.purpose}
              placeholder="Enter Purpose"
              require
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
              name=""
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
          <div className="PurposeGrid Address ">
            <Input
              onChange={handleInputChange}
              label="Address"
              type="text"
              name="address"
              placeholder="House No, Village, City Name, District, State"
              value={formData.address}
            />
          </div>

          <div className="container">
            <Box Src={imageUrl} buttonText="Click" />
            <Box Src={imageUrl} buttonText="Click" />
            <Box Src={imageUrl} buttonText="Click" />
            <Box Src={imageUrl} buttonText="Click" />
            <Box Src={imageUrl} buttonText="Click" />
          </div>

          <button onClick={handleSubmit} className="Submit-button">
            {" "}
            <i class="ri-save-fill"> </i>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonEntry;
