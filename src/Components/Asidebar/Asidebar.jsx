import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menudrop from "./Menudrop";
import MenuItems from "./MenuItems";
import "remixicon/fonts/remixicon.css";
import "./Asidebar.css";

const Asidebar = () => {
  const navigate =useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } mt-14  duration-1000  ease-in-out shadow-lg`}
        aria-label="Sidebar"
      >
        <div className="h-full py-4 shadow-2xl" id="tomakescrolldisable">
          <MenuItems />

          <ul className="px-2 py-2 mt-4 space-y-2 font-medium border-t border-gray-400">
            <Menudrop />
          </ul>

          <ul className="px-2 mt-4 space-y-2 font-medium border-t border-gray-400 py-2">
            <li className="hover:bg-gray-200 rounded-lg">
              <button
                onClick={handlelogout}
                className="flex items-center p-2 text-black   no-underline"
              >
                <i className="ri-shut-down-fill w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"></i>
                <span className="ms-3">Log-Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      {/* <button
        data-drawer-target="logo-sidebar"
        z
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 text-sm text-white rounded-lg  hover:bg-purple-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200 absolute top-3 left-2 z-[999] st"
        onClick={toggleSidebar} //Add onClick handler to toggle visibility
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button> */}
    </>
  );
};

export default Asidebar;
