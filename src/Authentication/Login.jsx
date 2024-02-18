// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"; // Import Axios
// import StyledAlert from "./StyledAlert";
// import loginlogo from "../../public/loginlogo.webp";
// import { FaRegCopyright } from "react-icons/fa6";
// import { LuUser2, LuEye, LuEyeOff } from "react-icons/lu";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     user: "",
//     password: "",
//     role: "Admin Login", // Default role
//   });
//   const [showAlert, setShowAlert] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("your_api_login_url", formData);
//       const userData = response.data; // Assuming API returns user data upon successful login
//       localStorage.setItem("user", JSON.stringify(userData));
//       navigate("/"); // Redirect to home page or dashboard
//     } catch (error) {
//       setShowAlert(true);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     // Redirect to login page or any other page
//     navigate("/login");
//   };

//   const closeAlert = () => {
//     setShowAlert(false);
//   };

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="max-w-[350px] mx-auto w-screen h-screen">
//       <div className="flex flex-col items-center pt-[10vh]">
//         <img
//           src={loginlogo}
//           className="object-cover w-1/2 h-1/2 mb-[5vh]"
//           alt="Logo"
//         />
//         <form onSubmit={handleLogin}>
//           <div className="relative">
//             <label htmlFor="user" className="mb-[1vh]">
//               Username
//             </label>
//             <input
//               type="text"
//               name="user"
//               value={formData.user}
//               onChange={handleInputChange}
//               className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
//               placeholder="Username"
//               id="user"
//               required // Make field required
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
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
//               placeholder="Password"
//               id="password"
//               required // Make field required
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
//             value={formData.role}
//             onChange={handleInputChange}
//             className="w-full px-6 py-3 mb-10 border border-slate-600 rounded-lg font-medium "
//             id="role"
//             required // Make field required
//           >
//             <option value="Admin Login">Admin Login</option>
//             <option value="Retailer Login">Retailer Login</option>
//             <option value="Back Office">Back Office</option>
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StyledAlert from "./StyledAlert";
import loginlogo from "../../public/loginlogo.webp";
import { FaRegCopyright } from "react-icons/fa6";
import { LuUser2, LuEye, LuEyeOff } from "react-icons/lu";

// Dummy data for validation
const validCredentials = {
  admin: { password: "1234", role: "Admin Login", redirect: "/headernavbar" },
  retailer: { password: "1234", role: "Retailer Login", redirect: "/headernavbar" },
  backoffice: { password: "1234", role: "Back Office", redirect: "/" },
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    role: "Admin Login", // Default role
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, password, role } = formData;
    // Simulating login with dummy data
    if (
      validCredentials[user] &&
      validCredentials[user].password === password &&
      validCredentials[user].role === role
    ) {
      // Successful login
      localStorage.setItem("user", JSON.stringify({ user, role }));
      navigate(validCredentials[user].redirect); // Redirect to the specified route
    } else {
      // Failed login
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
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
              placeholder="Username"
              id="user"
              required // Make field required
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium"
              placeholder="Password"
              id="password"
              required // Make field required
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
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-6 py-3 mb-10 border border-slate-600 rounded-lg font-medium "
            id="role"
            required // Make field required
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
