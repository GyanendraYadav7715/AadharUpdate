import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
  return (
    <>
      <div className="flex items-center justify-start rtl:justify-end">
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-white rounded-lg  hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-gray-200  "
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
        </button>
        <Link to="" className="flex ms-2 md:me-24">
          <img
            src="https://uidai.gov.in/images/langPage/Page-1.svg"
            className="me-3 h-8 w-12 object-cover"
            alt="Aadhar Logo"
          />
        </Link>
      </div>
    </>
  );
};

export default LeftNav;
