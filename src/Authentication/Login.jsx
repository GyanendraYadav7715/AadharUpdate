import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginlogo from "/loginlogo.webp";
import { FaRegCopyright } from "react-icons/fa";
import { RiUser2Line, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Local_Url } from "../constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    User_type: "",
    Name: "" 
  });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  // Handle login form submission
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const { Username, User_type, loginIDMail ,  } = formData;

      try {
        const apiUrl = `${Local_Url}/api/v1/admin/login`;
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const { redirect, Name } = response.data;

          localStorage.setItem(
            "user",
            JSON.stringify({ Username, User_type, loginIDMail, Name })
          );
          toast.success(response.data.message);

          navigate(redirect);
        } else {
          throw new Error(response.data.message || "Login failed");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    [formData, navigate]
  );

  // Toggle password visibility
  const toggleShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  return (
    <div className="max-w-[350px] mx-auto w-screen h-screen">
      <div className="flex flex-col items-center pt-[10vh]">
        <img
          src={loginlogo}
          className="object-cover w-1/2 h-1/2 mb-[5vh]"
          alt="Logo"
        />
        <form onSubmit={handleLogin} id="myForm">
          {/* Username Input */}
          <div className="relative">
            <label htmlFor="user" className="mb-[1vh]">
              Username
            </label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleInputChange}
              className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
              placeholder="Username"
              id="user"
              required
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <RiUser2Line />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="mb-[1vh]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
              placeholder="Password"
              id="password"
              required
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
            </div>
          </div>

          {/* Role Selection */}
          <label htmlFor="role" className="mb-[1vh]">
            Role
          </label>
          <select
            name="User_type"
            value={formData.User_type}
            onChange={handleInputChange}
            className="w-full px-6 py-3 mb-10 border border-slate-600 rounded-lg font-medium"
            id="role"
            required
          >
            <option value="">Select Type</option>
            <option value="Superadmin">Admin </option>
            <option value="Retailer">Retailer </option>
            <option value="BackOffice">Back Office</option>
          </select>

          {/* Login and Forgot Password Buttons */}
          <div className="flex justify-between items-center gap-2 mt-2 border-b border-gray-500 pb-[2vh]">
            <Link
              to="/forget"
              className="bg-black hover:bg-slate-800 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-2/3 whitespace-nowrap"
            >
              Forgot Password
            </Link>
            <button className="bg-blue-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-2/3">
              Log In
            </button>
          </div>
        </form>

        {/* Copyright */}
        <p className="bg-blue-500 flex items-center justify-center text-white p-3 mt-[5vh] w-[90%] text-center rounded-lg text-lg tracking-wide">
          Copyright
          <FaRegCopyright /> 2022 newupdateseva
        </p>
      </div>
    </div>
  );
};

export default Login;
