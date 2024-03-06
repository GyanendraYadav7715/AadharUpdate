import axios from "axios";
import React, { useState } from "react";
import "./PersonEntry.css";
import Box from "../../../Components/FingerPrint/FingerPrint";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../../constant/constant";

//custom input define
export const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  required = false, // Default value set to false
  maxLength,
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
        required={required ? "required" : undefined} // Set required attribute conditionally
        maxLength={maxLength}
      />
    </div>
  );
};

//MAIN FUNCTION TO COLLECTE FORM DATA
const PersonEntry = () => {
  const [formData, setFormData] = useState({
    Purpose: "",
    Name: "",
    FatherName: "",
    DOB: "",
    AadhaarNo: "",
    MobileNo: "",
    Email: "",
    Address: "",
    Proof: {
      POI: "",
      POB: "",
      POA: "",
    },
    FingerPrint: {
      FingerPrint1: "",
      FingerPrint2: "",
      FingerPrint3: "",
      FingerPrint4: "",
      FingerPrint5: "",
    },
  });

  //FORM DATA DATE CREATION
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

  //HANDLE FORM IN THE CONSOLE
  const handleInputChange = (name, value) => {
    console.log(`Handling input for ${name}: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
      createdOn: formatCurrentDate(),
    });
  };

  //SUBMITING THE FORM WITH WHOLE DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Purpose || !formData.Email || !formData.MobileNo) {
      return alert("Please fill all the required fields");
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/retailer/create-user`;
      const response = await axios.post(apiUrl, formData);
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully:");
      // Reset form data
      setFormData({
        Purpose: "",
        Name: "",
        FatherName: "",
        DOB: "",
        AadhaarNo: "",
        MobileNo: "",
        Email: "",
        Address: "",
        Proof: {
          POI: "",
          POB: "",
          POA: "",
        },
        FingerPrint: {
          FingerPrint1: "",
          FingerPrint2: "",
          FingerPrint3: "",
          FingerPrint4: "",
          FingerPrint5: "",
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Error submitting form:", error.message);
    }
  };

  return (
    <>
      <Breadcrumb
        title="Add Customer"
        links={[
          { title: "Home", href: "/superadmin" },
          { title: "Add Customer", href: "" },
        ]}
        mylinks={[
          {
            to: "/list",
            text: "View Customer",
            icon: "ri-team-line text-white text-2xl ",
          },
        ]}
      />

      <div className=" p-3 sm:ml-64 bg-gray-200">
        <div className="p-2 border-2 rounded-lg shadow-xl bg-white">
          <div className="PurposeGrid">
            <Input
              onChange={handleInputChange}
              label="Purpose"
              type="text"
              name="Purpose"
              value={formData.Purpose}
              placeholder="Enter Purpose"
              required
            />
          </div>
          <div className="formGrid">
            <Input
              onChange={handleInputChange}
              label="Full Name"
              type="text"
              value={formData.Name}
              name="Name"
              placeholder="Enter Name"
            />
            <Input
              onChange={handleInputChange}
              label="Father Name"
              type="text"
              value={formData.FatherName}
              name="FatherName"
              placeholder="Father Name"
            />
            <Input
              onChange={handleInputChange}
              label="Date of Birth"
              type="date"
              name="DOB"
              placeholder=""
              value={formData.DOB}
            />
            <Input
              onChange={handleInputChange}
              label="Aadhaar No."
              type="tel"
              name="AadhaarNo"
              placeholder="Aadhaar No."
              value={formData.AadhaarNo}
              maxLength={12}
            />
            <Input
              onChange={handleInputChange}
              label="Mobile No."
              type="tel"
              name="MobileNo"
              placeholder="Mobile No."
              value={formData.MobileNo}
              maxLength={10}
            />
            <Input
              onChange={handleInputChange}
              label="E-mail ID"
              type="email"
              name="Email"
              placeholder="example@update.com"
              value={formData.Email}
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
              name="Address"
              placeholder="House No, Village, City Name, District, State"
              value={formData.Address}
            />
          </div>
          <div className="container grid grid-cols-5">
            <Box
              onFingerprintUpload={(imageUrl) =>
                setFormData({
                  ...formData,
                  FingerPrint: {
                    ...formData.FingerPrint,
                    FingerPrint1: imageUrl,
                  },
                })
              }
            />
            <Box
              onFingerprintUpload={(imageUrl) =>
                setFormData({
                  ...formData,
                  FingerPrint: {
                    ...formData.FingerPrint,
                    FingerPrint2: imageUrl,
                  },
                })
              }
            />
            <Box
              onFingerprintUpload={(imageUrl) =>
                setFormData({
                  ...formData,
                  FingerPrint: {
                    ...formData.FingerPrint,
                    FingerPrint3: imageUrl,
                  },
                })
              }
            />
            <Box
              onFingerprintUpload={(imageUrl) =>
                setFormData({
                  ...formData,
                  FingerPrint: {
                    ...formData.FingerPrint,
                    FingerPrint4: imageUrl,
                  },
                })
              }
            />
            <Box
              onFingerprintUpload={(imageUrl) =>
                setFormData({
                  ...formData,
                  FingerPrint: {
                    ...formData.FingerPrint,
                    FingerPrint5: imageUrl,
                  },
                })
              }
            />

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
