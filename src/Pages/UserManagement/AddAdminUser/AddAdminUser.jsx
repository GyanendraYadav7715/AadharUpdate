import React from "react";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { useState } from "react";
import axios from "axios";
import { Local_Url } from "../../../constant/constant";
import CustomInput from "../../Validation/Vaildation";

const AddAdminUser = () => {
  const title = " Add User";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "Add User", href: "" },
  ];
  const mylinks = [
    {
      to: "/viewuser",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone_n: "",
    Balanace: "",
    Child_token: "",
    User_type: "",
    Username: "",
    Password: "",
  });

  // Function to handle form input changes
  const handleInputChange = (name, value) => {
    console.log(`Handling input for ${name}: ${value}`);
    if (name === "User_type") {
      setSelectedUserType(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.Name || !formData.Email || !formData.Username) {
    //   return alert("please filll the blank field first");
    // }

    try {
      // Define the API endpoint URL
      const apiUrl = `${Local_Url}/api/v1/admin/add-user`;

      // Make a POST request using Axios
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle successful response
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully:");
      // Optionally, reset the form after submission
      setFormData({
        Name: "",
        Email: "",
        Phone_n: "",
        Balanace: "",
        Child_token: "",
        User_type: "",
        Username: "",
        Password: "",
      });
    } catch (error) {
      // Handle submission error
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-300">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg  bg-white">
          <h3 className="text-2xl font-bold ml-10">Add Customer</h3>
          <form className="m-5 p-6 border-1 shadow-sm rounded-md bg-white">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <CustomInput
                onChange={handleInputChange}
                label="Full name"
                id="mobile"
                name="Name"
                value={formData.Name}
                type="text"
                pattern="[A-Z][a-zA-Z]*"
                errorMessage="Please enter a text with the first letter capitalized."
                required=""
              />
              <CustomInput
                onChange={handleInputChange}
                label="Username"
                id="Username"
                name="Username"
                value={formData.Username}
                type="text"
                pattern="[A-Z][a-zA-Z0-9_-]{2,15}"
                errorMessage="Username must start with a capital letter and be between 3 and 16 characters long, containing only letters, numbers, underscores, and hyphens."
                required=""
              />
              <CustomInput
                onChange={handleInputChange}
                label="Email"
                id="email"
                value={formData.Email}
                name="email"
                type="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                errorMessage="Please enter a valid email address."
                required=""
              />
              <CustomInput
                onChange={handleInputChange}
                label="Mobile Number"
                id="mobile"
                name="Phone_n"
                value={formData.Phone_n}
                type="tel"
                pattern="[0-9]{10}"
                errorMessage="Please enter a valid 10-digit mobile number."
                required=""
              />

              <CustomInput
                onChange={handleInputChange}
                label="Balance"
                id="Balance"
                name="Balance"
                type="number"
                value={formData.Balanace}
                pattern="[0-9]+"
                errorMessage="Please enter a valid number."
                required=""
              />
              <CustomInput
                onChange={handleInputChange}
                label=" Child Token"
                id=" Child Token"
                name=" Child Token"
                type="number"
                value={formData.Child_token}
                pattern="[0-9]+"
                errorMessage="Please enter a valid number."
                required=""
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
                required=""
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Usertype
              </label>
              <select
                required
                onChange={handleInputChange}
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

            <button className="Submit-button" onClick={handleSubmit}>
              <i class="ri-save-fill"> </i>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdminUser;
