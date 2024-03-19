import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { CustomInput } from "../../../Components/CustomeInput/CustomInput";
import { Local_Url } from "../../../constant/constant";

const AddAdminUser = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_n: "",
    Balance: "",
    Child_token: "",
    User_type: "",
    Username: "",
    Password: "",
    superAdminUser: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "Name",
      "Email",
      "Username",
      "Balance",
      "Phone_n",
      "Password",
      "Child_token",
    ];
    if (requiredFields.some((field) => !formData[field])) {
      return alert("Please fill all required fields.");
    }
    const userData = JSON.parse(localStorage.getItem("user"));
    formData.superAdminUser = userData ? userData.Username : "";

    try {
      const apiUrl = `${Local_Url}/api/v1/admin/add-customer`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      setFormData({
        Name: "",
        Email: "",
        Phone_n: "",
        Balance: "",
        Child_token: "",
        User_type: "",
        Username: "",
        Password: "",
      });
    } catch (error) {
      alert(error.message);
      //console.error("Error submitting form:", error.message);
    }
  };

  return (
    <>
      <Breadcrumb
        title={"Add User"}
        links={[{ title: "Home", href: "/superadmin" }, { title: "Add User" }]}
        mylinks={[
          {
            to: "/viewuser",
            text: "View Customer",
            icon: "ri-team-line text-white text-2xl ",
          },
        ]}
      />
      <div className="p-4 sm:ml-64 bg-gray-300">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <h3 className="text-2xl font-semibold ml-3 mb-3">Add Customer</h3>
          <form className="m-2 p-6  shadow-sm rounded-md bg-white border-[#00000047] border-2 h-[80vh]">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <CustomInput
                label="Full name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                type="text"
                pattern="[A-Z][a-zA-Z]*"
                errorMessage="Please enter a text with the first letter capitalized."
                placeholder="Full Name"
              />
              <CustomInput
                label="Username"
                name="Username"
                value={formData.Username}
                onChange={handleInputChange}
                type="text"
                pattern="[A-Z][a-zA-Z0-9_-]{2,15}"
                errorMessage="Username must start with a capital letter and be between 3 and 16 characters long, containing only letters, numbers, underscores, and hyphens."
                placeholder="UP_#$_E1"
              />
              <CustomInput
                label="Email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                errorMessage="Please enter a valid email address."
                placeholder="email23@email.com"
              />
              <CustomInput
                label="Mobile Number"
                name="Phone_n"
                value={formData.Phone_n}
                onChange={handleInputChange}
                type="tel"
                pattern="[0-9]{10}"
                errorMessage="Please enter a valid 10-digit mobile number."
                placeholder="Mobile"
                maxLength={10}
              />
              <CustomInput
                label="Balance"
                name="Balance"
                value={formData.Balance}
                onChange={handleInputChange}
                type="number"
                pattern="[0-9]+"
                errorMessage="Please enter a valid number."
              />
              <CustomInput
                label="Child Token"
                name="Child_token"
                value={formData.Child_token}
                onChange={handleInputChange}
                type="number"
                pattern="[0-9]+"
                errorMessage="Please enter a valid number."
              />
            </div>
            <div className="mb-6">
              <CustomInput
                onChange={handleInputChange}
                label="Password"
                id="password"
                value={formData.Password}
                name="Password"
                type="password"
                pattern=".{6,}"
                errorMessage="Password must be at least 6 characters long."
                placeholder="Password"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Usertype
              </label>
              <select
                required
                onChange={(e) => handleInputChange("User_type", e.target.value)}
                name="User_type"
                value={formData.User_type}
                className="bg-white border text-gray-900 text-sm rounded-sm inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
              >
                <option value="">Select One</option>
                <option value="Sub Admin">Sub Admin</option>
                <option value="Retailer">Retailer</option>
                <option value="Back Office">Back Office</option>
              </select>
            </div>
             
            <div className="">
              <button
                className="Submit-button whitespace-nowrap bg-[#3f9e04] hover:bg-[#3f9e04d3]"
                type="submit"
                onClick={handleSubmit}
              >
                <i class="ri-save-fill"> </i>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdminUser;
