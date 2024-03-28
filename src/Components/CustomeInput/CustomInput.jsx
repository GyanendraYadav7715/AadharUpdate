import React, { useState } from "react";

export const CustomInput = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  maxLength,
}) => {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    let errorMessage = "";

    // Perform validation based on input type
    switch (type) {
      case "email":
        if (!validateEmail(inputValue)) {
          errorMessage = "Please enter a valid email address.";
        }
        break;
      case "tel":
        if (!validateMobileNumber(inputValue)) {
          errorMessage = "Please enter a valid 10-digit mobile number.";
        }
        break;
      // case "fullname":
      //   if (!validateFullName(inputValue)) {
      //     errorMessage =
      //       "Please enter the first letter is always capital at full name";
      //   }
      //   break;
      // case "username":
      //   if (!validateUsername(inputValue)) {
      //     errorMessage =
      //       "Username must start with a capital letter and be between 3 and 16 characters long, containing only letters, numbers, underscores, and hyphens.";
      //   }
      //   break;
      // case "number":
      //   if (!validateNumber(inputValue)) {
      //     errorMessage = "Please enter a valid number.";
      //   }
      //   break;
      // case "password":
      //   if (!validatePassword(inputValue)) {
      //     errorMessage = "Password must be at least 6 characters long";
      //   }
      //   break;
      case "aadhar":
        if (!validateAadharNumber(inputValue)) {
          errorMessage = "Invalid Aadhar number";
        }
        break;
      // case "address":
      //   if (!validateAddress(inputValue)) {
      //     errorMessage = "Invalid address";
      //   }
      //   break;
      default:
        break;
    }

    setError(errorMessage);

    onChange(name, inputValue);
  };

  // Email validation function
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Mobile number validation function
  const validateMobileNumber = (number) => {
    return /^\d{10}$/.test(number); // Assumes 10-digit mobile number
  };

  // Full name validation function
  // const validateFullName = (fullName) => {
  //   const words = fullName.split(" ");
  //   for (let i = 0; i < words.length; i++) {
  //     if (!/^[A-Z]/.test(words[i])) {
  //       return false;
  //     }
  //   }

  //   return /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(fullName);
  // };

  // Username validation function
  // const validateUsername = (username) => {
  //   if (!/^[A-Z]/.test(username)) {
  //     return false;
  //   }

  //   if (!/^[A-Za-z0-9_-]+$/.test(username)) {
  //     return false;
  //   }

  //   return username.length >= 3 && username.length <= 16;
  // };
  // Number validation function
  // const validateNumber = (number) => {
  //   return !isNaN(number);
  // };

  // Password validation function
  // const validatePassword = (password) => {
  //   return password.length >= 6;
  // };

  // Aadhar number validation function
  const validateAadharNumber = (aadharNumber) => {
    return /^\d{12}$/.test(aadharNumber);
  };

  // Address validation function
  // const validateAddress = (address) => {
  //   return address.trim() !== "";
  // };

  return (
    <div className="inputContainer">
      <div className="inputWrapper">
        <label htmlFor={name} className="label">
          {label}
        </label>
      </div>
      <input
        name={name}
        type={type}
        className="inputField"
        placeholder={placeholder}
        value={value}
        required
        onChange={handleInputChange}
        maxLength={maxLength}
      />
      {error && <div className="error text-red-600">{error}</div>}
    </div>
  );
};

export const CustomInput2 = ({
  label,
  type,
  name,
  placeholder,
  disabled
   
}) => {
  return (
    <div className="inputContainer">
      <div className="inputWrapper">
        <label htmlFor={name} className="label">
          {label}
        </label>
      </div>
      <input
        name={name}
        type={type}
        className="inputField"
        placeholder={placeholder}
        disabled
      />
    </div>
  );
};
