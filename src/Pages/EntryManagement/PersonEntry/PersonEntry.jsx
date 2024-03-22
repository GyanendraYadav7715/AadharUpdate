import axios from "axios";
import React, { useState } from "react";
import "./PersonEntry.css";
import Box from "../../../Components/FingerPrint/FingerPrint";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../../constant/constant";
import { CustomInput } from "../../../Components/CustomeInput/CustomInput";
import FileUpload from "../../../Components/FileUpload/FileUpload";

//MAIN FUNCTION TO COLLECTE FORM DATA
const PersonEntry = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }

  const [formData, setFormData] = useState({
    Purpose: "",
    Name: "",
    FatherName: "",
    DOB: "",
    AadhaarNo: "",
    MobileNo: "",
    Email: "",
    Address: "",
    Proof: [{ POI: "" }, { POB: "" }, { POA: "" }],
    FingerPrint: [
      { FingerPrint1: "" },
      { FingerPrint2: "" },
      { FingerPrint3: "" },
      { FingerPrint4: "" },
      { FingerPrint5: "" },
    ],
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
    const data = localStorage.getItem("user");
    const userObj = JSON.parse(data);
    formData.userName = userObj.Username;
    formData.userType = userObj.User_type;
    // Access the role property
    role = userObj.User_type;

    if (!formData.Purpose || !formData.Email || !formData.MobileNo) {
      return  toast.error("Please fill all the required fields");
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/retailer/create-user`;
      const response = await axios.post(apiUrl, formData);
      //console.log("Form submitted successfully:", response.data);
       toast.success(response.data.message);
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
      //console.error("Error submitting form:", error.message);
      toast.error(error.response.data.message);
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

      <div className=" p-3 sm:ml-64 ">
        <div className="p-4 border-2 rounded-lg shadow-xl bg-white">
          <h3 className="text-2xl font-semibold ml-3 mb-3">Add Customer</h3>
          <div className="px-6 py-4 m-2  shadow-sm rounded-md bg-white border-[#00000047] border-2 ">
            <div className="PurposeGrid">
              <CustomInput
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
              <CustomInput
                onChange={handleInputChange}
                label="Date of Birth"
                type="date"
                name="DOB"
                placeholder=""
                value={formData.DOB}
              />
              <CustomInput
                onChange={handleInputChange}
                label="Aadhaar No."
                type="tel"
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
              />
               
                <FileUpload
                  title="POI"
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
                  title="POB"
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
                  title="POA"
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
             
            </div>
            <div className="PurposeGrid Address">
              <CustomInput
                onChange={handleInputChange}
                label="Address"
                type="text"
                name="Address"
                placeholder="House No, Village, City Name, District, State"
                value={formData.Address}
              />
            </div>
            <div className="container grid grid-cols-5 p-5">
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  onFingerprintUpload={(imageUrl) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      FingerPrint: {
                        ...prevFormData.FingerPrint,
                        [`FingerPrint${index + 1}`]: imageUrl,
                      },
                    }))
                  }
                />
              ))}
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

export default PersonEntry;
