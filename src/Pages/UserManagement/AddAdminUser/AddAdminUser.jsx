import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { CustomInput } from "../../../Components/CustomeInput/CustomInput";
import { Local_Url } from "../../../constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    setFormData({ ...formData, [name]: value });
  };

     const validateFullName = (fullName) => {
       const words = fullName.split(" ");
       for (let i = 0; i < words.length; i++) {
         if (!/^[A-Z]/.test(words[i])) {
           return false;
         }
       }

       return /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(fullName);
     };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateUsername = (username) =>
    /^[A-Za-z0-9_-]+$/.test(username) &&
    username.length >= 3 &&
    username.length <= 16;

  const validateMobileNumber = (Phone_n) => /^\d{10}$/.test(Phone_n);

  const validatePassword = (password) => password.length >= 6;

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
      return toast.error("Please fill all the fields");
    }

    if (!validateMobileNumber(formData.Phone_n)) {
      return toast.error("Please enter a valid Mobile No");
    }

    if (!validateFullName(formData.Name)) {
      return toast.error("Please enter a valid full name");
    }

    if (!validateEmail(formData.Email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (!validateUsername(formData.Username)) {
      return toast.error("Please enter a valid Username.");
    }

    if (!validatePassword(formData.Password)) {
      return toast.error("Please enter a valid Password.");
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    formData.superAdminUser = userData ? userData.Username : "";

    try {
      const apiUrl = `${Local_Url}/api/v1/admin/add-customer`;
      const response = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
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
          <form className="m-2 p-6  shadow-sm rounded-md bg-white border-[#00000047] border-2 min-h-[90vh]">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <CustomInput
                label="Full name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                type="fullname"
                placeholder="Full Name"
                maxLength={50}
                validate={validateFullName}
              />
              <CustomInput
                label="Username"
                name="Username"
                value={formData.Username}
                onChange={handleInputChange}
                type="username"
                placeholder="UP_#$_E1"
                maxLength={16}
                validate={validateUsername}
              />
              <CustomInput
                label="Email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                placeholder="email23@email.com"
                maxLength={50}
                validate={validateEmail}
              />
              <CustomInput
                label="Mobile Number"
                name="Phone_n"
                value={formData.Phone_n}
                onChange={handleInputChange}
                type="tel"
                placeholder="Mobile"
                maxLength={10}
                validate={validateMobileNumber}
              />
              <CustomInput
                label="Balance"
                name="Balance"
                value={formData.Balance}
                onChange={handleInputChange}
                type="number"
              />
              <CustomInput
                label="Child Token"
                name="Child_token"
                value={formData.Child_token}
                onChange={handleInputChange}
                type="number"
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
                placeholder="Password"
                validate={validatePassword}
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

            <button
              className="Submit-button whitespace-nowrap bg-[#3f9e04] hover:bg-[#3f9e04d3]"
              type="submit"
              onClick={handleSubmit}
            >
              <i className="ri-save-fill"> </i>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdminUser;
