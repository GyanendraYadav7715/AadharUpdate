import React, { useState } from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import axios from "axios";
import { Local_Url } from "../../constant/constant";

const Balance = () => {
  const [formData, setFormData] = useState({
    Username: "",
    amount: "",
  });

  const { Username, amount } = formData;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
        [id]: value,
      
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any input field is empty
    if (Username.trim() === "" || amount.trim() === "") {
      alert("Please fill the all fields");
      return;
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/sharedData/user_limit`;
      // Make the API POST request
      const response = await axios.post(apiUrl, formData);

      // Handle success
      console.log("Response:", response.data);
      alert("User Limit set");
      setFormData({
        Username: "",
        amount: "",
      });
    } catch (error) {
      // Handle error
      console.error("Error:", error.message);
      alert("Something went worng");
    }
  };
  const title = "User Limit";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "User Limit", href: "" },
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
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-1 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-gray-300">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">Please set the User Limit</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start w-full border p-9 rounded-sm bg-white"
            >
              <div className="flex justify-between items-center w-full">
                <div className="mb-5 w-1/2 p-6">
                  <label
                    htmlFor="Username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="Username"
                    value={Username}
                    onChange={handleChange}
                    className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Username"
                    required
                  />
                </div>
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
              </div>
              <div className="p-6">
                <button
                  className="Submit-button whitespace-nowrap bg-green-600"
                  type="submit"
                >
                  <i class="ri-save-fill"> </i>
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

export default Balance;
