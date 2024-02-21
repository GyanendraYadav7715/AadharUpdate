import React, { useState } from "react";

const CustomInput = ({ label, id, name, type, pattern, errorMessage }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);

    // Validate input using the provided regular expression pattern
    const isValid = new RegExp(pattern).test(value);
    if (!isValid) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        pattern={pattern}
        required
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default CustomInput;
