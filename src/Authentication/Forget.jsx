import React, { useState, useCallback } from "react";
import { RiUser2Line, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import loginlogo from "/loginlogo.webp";

const Forget = () => {
  const [formData, setFormData] = useState({
    Username: "",
    newPassword: "",
    // confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  const handlereset = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const apiUrl = `${Local_Url}/api/v1/admin/resetPassword`;
        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    [formData]
  );

  return (
    <>
      <div className="max-w-[350px] mx-auto  w-screen h-screen">
        <div className="flex flex-col items-center   pt-[10vh]">
          <img
            src={loginlogo}
            className=" object-cover w-1/2 h-1/2 mb-[5vh]"
            alt="Logo"
          />

          <form onSubmit={handlereset}>
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
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
                placeholder="............"
                required
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
              </div>
            </div>
            {/* Password Input */}
            <div className="relative sr-only">
              <label htmlFor="password" className="mb-[1vh] ">
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleInputChange}
                className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
                placeholder="............"
                required
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
              </div>
            </div>

            <div className="border-b border-gray-500 pb-[2vh]">
              <button
                className="bg-blue-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full"
                type="submit"
              >
                Reset
              </button>
            </div>
          </form>
          <Link
            to="/"
            className="bg-black hover:bg-slate-800 text-white text-center rounded-lg py-2.5 px-5 transition-colors w-full mt-[3vh]"
          >
            Back
          </Link>

          <p className="  text-black p-3 mt-[7vh] w-full text-center rounded-lg text-16">
            Copyright © 2022 newupdateseva. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Forget;
