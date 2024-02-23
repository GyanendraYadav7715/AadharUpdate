// import React, { useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import StyledAlert from "./StyledAlert";
// import loginlogo from "../../public/loginlogo.webp";
// import { FaRegCopyright } from "react-icons/fa6";
// import { LuUser2, LuEye, LuEyeOff } from "react-icons/lu";

// const validCredentials = {
//   admin: { password: "1234", role: "Admin", redirect: "/superadmin" },
//   retailer: { password: "1234", role: "Retailer", redirect: "/retailer" },
//   backoffice: {
//     password: "1234",
//     role: "BackOffice",
//     redirect: "/backoffice",
//   },
// };

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     user: "",
//     password: "",
//     role: "Admin", // Default role
//   });
//   const [showAlert, setShowAlert] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleInputChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   }, []);

//   const handleLogin = useCallback(
//     (e) => {
//       e.preventDefault();
//       const { user, password, role } = formData;
//       if (
//         validCredentials[user] &&
//         validCredentials[user].password === password &&
//         validCredentials[user].role === role
//       ) {
//         localStorage.setItem("user", JSON.stringify({ user, role }));
//         navigate(validCredentials[user].redirect);
//       } else {
//         setShowAlert(true);
//       }
//     },
//     [formData, navigate]
//   );

//   const handleLogin = useCallback(
//     async (e) => {
//       e.preventDefault();
//       const { user, password, role } = formData;
//       try {
//         const response = await fetch("/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ user, password, role }),
//         });
//         const data = await response.json();
//         if (response.ok) {
//           localStorage.setItem("user", JSON.stringify({ user, role }));
//           navigate("/superadmin");
//         } else {
//           throw new Error(data.message || "Login failed");
//         }
//       } catch (error) {
//         setShowAlert(true);
//         console.error("Login error:", error);
//       }
//     },
//     [formData, navigate]
//   );

//   const closeAlert = useCallback(() => {
//     setShowAlert(false);
//   }, []);

//   const toggleShowPassword = useCallback(() => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   }, []);

//   return (
//     <div className="max-w-[350px] mx-auto w-screen h-screen">
//       <div className="flex flex-col items-center pt-[10vh]">
//         <img
//           src={loginlogo}
//           className="object-cover w-1/2 h-1/2 mb-[5vh]"
//           alt="Logo"
//         />
//         <form onSubmit={handleLogin} id="myForm">
//           <div className="relative">
//             <label htmlFor="user" className="mb-[1vh]">
//               Username
//             </label>
//             <input
//               type="text"
//               name="user"
//               defaultValue={formData.user}
//               onChange={handleInputChange}
//               className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
//               placeholder="Username"
//               id="user"
//               required
//             />
//             <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//               <LuUser2 />
//             </div>
//           </div>

//           <div className="relative">
//             <label htmlFor="password" className="mb-[1vh]">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               defaultValue={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
//               placeholder="Password"
//               id="password"
//               required
//             />
//             <div
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
//               onClick={toggleShowPassword}
//             >
//               {showPassword ? <LuEye /> : <LuEyeOff />}
//             </div>
//           </div>

//           <label htmlFor="role" className="mb-[1vh]">
//             Role
//           </label>
//           <select
//             name="role"
//             defaultValue={formData.role}
//             onChange={handleInputChange}
//             className="w-full px-6 py-3 mb-10 border border-slate-600 rounded-lg font-medium"
//             id="role"
//             required
//           >
//             <option value="Admin">Admin Login</option>
//             <option value="Retailer">Retailer Login</option>
//             <option value="BackOffice">Back Office</option>
//           </select>

//           <div className="flex justify-between items-center gap-2 mt-2 border-b border-gray-500 pb-[2vh]">
//             <Link
//               to="/forget"
//               className="bg-black hover:bg-slate-800 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-2/3 whitespace-nowrap"
//             >
//               Forgot Password
//             </Link>
//             <button className="bg-blue-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-2/3">
//               Log In
//             </button>
//           </div>
//         </form>

//         <p className="bg-blue-500 flex items-center justify-center   text-white p-3 mt-[5vh] w-[90%] text-center rounded-lg text-lg    tracking-wide">
//           Copyright
//           <FaRegCopyright /> 2022 newupdateseva
//         </p>
//       </div>
//       {showAlert && (
//         <StyledAlert
//           onClose={closeAlert}
//           title="Error"
//           message="Oops! Something went wrong. Please check your username, password, and role."
//           buttonText="Dismiss"
//         />
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledAlert from "./StyledAlert";
import axios from 'axios'
import loginlogo from "../../public/loginlogo.webp";
import { FaRegCopyright } from "react-icons/fa";
import { RiUser2Line, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import  {Local_Url} from "../constant/constant"
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    User_type: "", // Default role
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(`Handling input for ${name}: ${value}`);
  }, []);

 const handleLogin = useCallback(
   async (e) => {
     e.preventDefault();
     const { Username, Password, User_type } = formData;

     try {
       const apiUrl = `${Local_Url}/api/v1/sharedData/retailer-login`;
       const response = await axios.post(apiUrl, formData ,{
        headers: {
          "Content-Type": "application/json",
        },
       });

       if (response.status === 200) {
         localStorage.setItem(
           "user",
           JSON.stringify({ Username, Password, User_type })
         );
         alert("Login Success");
         console.log("Response Data:", response.data);
         navigate("/superadmin");
       } else {
         throw new Error(response.data.message || "Login failed");
       }
     } catch (error) {
       setShowAlert(true);
       console.error("Login error:", error);
     }
   },
   [formData, navigate]
 );

  const closeAlert = useCallback(() => {
    setShowAlert(false);
  }, []);

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
            <option value="Admin">Admin Login</option>
            <option value="Retailer">Retailer Login</option>
            <option value="BackOffice">Back Office</option>
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
          onClose={closeAlert}
          title="Error"
          message="Oops! Something went wrong. Please check your username, password, and role."
          buttonText="Dismiss"
        />
      )}
    </div>
  );
};

export default Login;