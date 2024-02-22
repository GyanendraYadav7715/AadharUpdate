import React from "react";
import Asidebar from "../../../Components/Asidebar/Asidebar";
import HeaderNavbar from "../../../Components/HeaderNabar/HeaderNavbar";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import Footer from "../../../Components/Footer/Footer";
import { useState } from "react";
import axios from "axios";
import { Local_Url } from "../../../constant/constant";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  pattern,
  required,
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        onChange={(e) => onChange(name, e.target.value)}
        type={type}
        value={value}
        name={name}
        className="bg-white border text-gray-900 text-sm rounded-sm block w-full p-2.5 inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder={placeholder}
        pattern={pattern}
        required={required}
      />
    </div>
  );
};

const AddAdminUser = () => {
// const [selectedUserType, setSelectedUserType] = useState("");
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
  
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }

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
      <Asidebar />
      <HeaderNavbar />

      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-300">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg  bg-white">
          <h3 className="text-2xl font-bold ml-10">Add Customer</h3>
          <form className="m-5 p-6 border-1 shadow-sm rounded-md bg-white">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <InputField
                onChange={handleInputChange}
                label="Full name"
                type="text"
                name="Name"
                value={formData.Name}
                placeholder="Gyan Yadav"
                required
              />
              <InputField
                onChange={handleInputChange}
                label="Username"
                name="Username"
                type="text"
                value={formData.Username}
                placeholder="UP1D34"
                required
              />
              <InputField
                onChange={handleInputChange}
                label="Email"
                name="Email"
                type="email"
                value={formData.Email}
                placeholder="gyan@rto.com"
                required
              />
              <InputField
                onChange={handleInputChange}
                label="Phone number"
                name="Phone_n"
                type="number"
                value={formData.Phone_n}
                placeholder="84-84-655-655"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
              <InputField
                onChange={handleInputChange}
                label="Balance"
                name="Balanace"
                type="number"
                value={formData.Balanace}
                placeholder=""
                required
              />
              <InputField
                onChange={handleInputChange}
                label="Child Token"
                name="Child_token"
                value={formData.Child_token}
                type="number"
                placeholder=""
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>

              <InputField
                onChange={handleInputChange}
                type="password"
                name="Password"
                value={formData.Password}
                className="bg-white border   text-gray-900 text-sm rounded-sm inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                placeholder=""
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Usertype
              </label>
              <select
                onChange={handleInputChange}
                name="User_type"
                value={formData.User_type}
                className="bg-white border   text-gray-900 text-sm rounded-sm inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
              >
                <option value="">Select User Type</option>
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
      <Footer />
    </>
  );
};

export default AddAdminUser;
