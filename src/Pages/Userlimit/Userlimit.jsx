import React, { useState } from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import axios from "axios";
import { Local_Url } from "../../constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLimit = () => {
  // State variables for form data
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
  });

  // Destructuring form data for easier access
  const { username, amount } = formData;

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (username.trim() === "" || amount.trim() === "") {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/sharedData/user_limit`;

      const response = await axios.post(apiUrl, formData);

      toast.success(response.data.message);

      // Reset form data after successful submission
      setFormData({
        username: "",
        amount: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Breadcrumb data
  const title = "User Limit";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "User Limit", href: "" },
  ];

  // Additional links for breadcrumb
  const mylinks = [
    {
      to: "/viewuser",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];

  return (
    <>
      {/* Breadcrumb component */}
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">
              Please set the User Limit
            </h3>

            {/* User Limit form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start w-full border-[#00000063] p-9 rounded-md bg-white border-2"
            >
              <div className="flex justify-between items-center w-full">
                {/* Username input component */}
                <UsernameInput
                  username={username}
                  handleChange={handleChange}
                />

                {/* Amount input component */}
                <AmountInput amount={amount} handleChange={handleChange} />
              </div>

              {/* Submit button */}
              <div className="pl-3">
                <button
                  className="Submit-button whitespace-nowrap bg-[#3f9e04] hover:bg-[#3f9e04d3]"
                  type="submit"
                >
                  <i className="ri-save-fill"> </i>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Username input component
const UsernameInput = ({ username, handleChange }) => (
  <div className="mb-5 w-1/2 p-6">
    <label
      htmlFor="Username"
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      Username
    </label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={handleChange}
      className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Username"
      required
    />
  </div>
);

// Amount input component
const AmountInput = ({ amount, handleChange }) => (
  <div className="mb-5 w-1/2 p-6">
    <label
      htmlFor="amount"
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      Amount
    </label>
    <input
      type="number"
      id="amount"
      value={amount}
      onChange={handleChange}
      className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      placeholder="Amount"
      required
    />
  </div>
);

export default UserLimit;
