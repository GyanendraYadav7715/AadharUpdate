import React, { useState } from "react";
import HeaderNavbar from "../../Components/HeaderNabar/HeaderNavbar";
import Footer from "../../Components/Footer/Footer";
import Asidebar from "../../Components/Asidebar/Asidebar";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";

const Balance = () => {
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
  });

  const { username, amount } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any input field is empty
    if (username.trim() === "" || amount.trim() === "") {
      alert("Please fill in all fields");
      return;
    }
    // Add regex pattern validation here if needed
    // Example: const usernamePattern = /^[a-zA-Z0-9]+$/;

    // If all validations pass, make API POST request
    // Example: axios.post('/api/your-endpoint', formData);
    console.log("Form submitted:", formData);
  };

  const title = "Balance Transfer";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "Balance Transfer", href: "" },
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
      <div className="p-1 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-gray-300">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-bold">Balance Transfer</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start w-full border p-9 rounded-sm bg-white"
            >
              <div className="flex justify-between items-center w-full">
                <div className="mb-5 w-1/2 p-6">
                  <label
                    htmlFor="username"
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
                  type="submit"
                  className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Balance;
