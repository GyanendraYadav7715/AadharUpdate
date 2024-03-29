import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import IPAddress from "../InternetProtocol/IPAddress";
import { CiLogout } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoWifiOutline } from "react-icons/io5";

const RightNav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getUserRole = useMemo(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData).Username : "";
  }, []);

  const role = getUserRole;
  const link =
    role === "Superadmin"
      ? "/superadmin"
      : role === "Retailer"
      ? "/retailer"
      : "/backoffice";

  return (
    <div className="flex items-center">
      <div className="flex items-center ms-3 relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded={open ? "true" : "false"}
          aria-controls="dropdown-user"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/user-3711850-3105265.png"
            alt="user photo"
          />
        </button>
        {open && (
          <div
            className="absolute top-5 right-0 mt-2 w-52 bg-white divide-y divide-gray-100 rounded shadow-xl"
            id="dropdown-user"
            role="menu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="px-5 py-3">
              <p className="text-base text-gray-900">{role}</p>
              <div className="flex items-center">
                <IoWifiOutline className="text-red-700" />
                <IPAddress />
              </div>
            </div>
            <ul className="py-1 px-3">
              <li>
                <Link
                  to={link}
                  className="flex items-center px-1 py-2 text-sm text-gray-900 hover:bg-gray-50 no-underline gap-2"
                  role="menuitem"
                >
                  <LuLayoutDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-1 py-2 text-sm text-gray-900 hover:bg-gray-50 no-underline gap-2 flex items-center"
                  role="menuitem"
                >
                  <CiLogout /> Log out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightNav;
