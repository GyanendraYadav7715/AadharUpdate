import React from "react";
import Asidebar from "../../../Components/Asidebar/Asidebar";
import HeaderNavbar from "../../../Components/HeaderNabar/HeaderNavbar";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import Footer from "../../../Components/Footer/Footer";

const InputField = ({ label, id, type, placeholder, pattern, required }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-white border   text-gray-900 text-sm rounded-sm  block w-full p-2.5 inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder={placeholder}
        pattern={pattern}
        required={required}
      />
    </div>
  );
};

const AddAdminUser = () => {
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
                label="Full name"
                id="full_name"
                type="text"
                placeholder="Gyan Yadav"
                required
              />
              <InputField
                label="Username"
                id="user_name"
                type="text"
                placeholder="UP1D34"
                required
              />
              <InputField
                label="Email"
                id="email"
                type="email"
                placeholder="gyan@rto.com"
                required
              />
              <InputField
                label="Phone number"
                id="phone"
                type="tel"
                placeholder="84-84-655-655"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
              <InputField
                label="Balance"
                id="balance"
                type="number"
                placeholder=""
                required
              />
              <InputField
                label="Child Token"
                id="child_token"
                type="number"
                placeholder=""
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-white border   text-gray-900 text-sm rounded-sm inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="select_user"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Usertype
              </label>
              <select
                id="select_user"
                className="bg-white border   text-gray-900 text-sm rounded-sm inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2.5"
                required
              >
                <option value="Admin Login">Admin Login</option>
                <option value="Retailer Login">Retailer Login</option>
                <option value="Back Office">Back Office</option>
              </select>
            </div>

            <button className="Submit-button">
              
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
