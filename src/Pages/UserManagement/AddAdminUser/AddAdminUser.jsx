import React from "react";


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
        className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        pattern={pattern}
        required={required}
      />
    </div>
  );
};

const AddAdminUser = () => {
  return (
    <div className="hero-section">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14 bg-white">
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
              className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
              className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="Admin Login">Admin Login</option>
              <option value="Retailer Login">Retailer Login</option>
              <option value="Back Office">Back Office</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminUser;
