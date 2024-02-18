import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledAlert from "./StyledAlert";
import loginlogo from "../../public/loginlogo.webp";
import { FaRegCopyright } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userRef.current.value;
    const password = passwordRef.current.value;
    const role = roleRef.current.value;

    const validCredentials = {
      admin: { password: "1234", role: "Admin Login", redirect: "/" },
      retailer: { password: "1234", role: "Retailer Login", redirect: "/" },
      backoffice: { password: "1234", role: "Back Office", redirect: "/" },
    };

    const matchedUser = Object.entries(validCredentials).find(
      ([key, value]) =>
        user === key && password === value.password && role === value.role
    );

    if (matchedUser) {
      navigate(matchedUser[1].redirect);
    } else {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-[350px] mx-auto w-screen h-screen">
      <div className="flex flex-col items-center pt-[10vh]">
        <img
          src={loginlogo}
          className="object-cover w-1/2 h-1/2 mb-[5vh]"
          alt="Logo"
        />
        <form onSubmit={handleLogin}>
          <div className="relative">
            <label htmlFor="user" className="mb-[1vh]">
              Username
            </label>
            <input
              type="text"
              className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
              placeholder="Username"
              id="user"
              ref={userRef}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <LuUser2 />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="mb-[1vh]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
              placeholder="Password"
              id="password"
              required=""
              ref={passwordRef}
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? <LuEye /> : <LuEyeOff />}
            </div>
          </div>

          <label htmlFor="role" className="mb-[1vh]">
            Role
          </label>
          <select
            className="w-full px-6 py-3 mb-10 border border-slate-600 rounded-lg font-medium "
            id="role"
            ref={roleRef}
          >
            <option value="Admin Login">Admin Login</option>
            <option value="Retailer Login">Retailer Login</option>
            <option value="Back Office">Back Office</option>
          </select>

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

        <p className="bg-blue-500 flex items-center justify-center   text-white p-3 mt-[5vh] w-[90%] text-center rounded-lg text-lg    tracking-wide">
          Copyright
          <FaRegCopyright /> 2022 newupdateseva
        </p>
      </div>

      {showAlert && (
        <StyledAlert
          onClose={() => setShowAlert(false)}
          title="Error"
          message="Oops! Something went wrong. Please check your username, password, and role."
          buttonText="Dismiss"
        />
      )}
    </div>
  );
};

export default Login;
