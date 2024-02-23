import React, { useState } from "react";

const CustomInput = ({ label, id, name, type, pattern, value }) => {
  
  // const [value, setValue] = useState("");
  // const [error, setError] = useState("");

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setValue(value);

  //   // Validate input using the provided regular expression pattern
  //   const isValid = new RegExp(pattern).test(value);
  //   if (!isValid) {
  //     setError(errorMessage);
  //   } else {
  //     setError("");
  //   }
  // };

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}:
      </label>
      <input
        className="bg-white border text-gray-900 text-sm rounded-sm block w-full p-2.5 inputField focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        pattern={pattern}
        required
      />
      {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
    </div>
  );
};

export default CustomInput;
