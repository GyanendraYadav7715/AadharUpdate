import React from "react";
import LeftNav from "./LeftNav/LeftNav";
import RightNav from "./RightNav/RightNav";

const HeaderNavbar = () => {
  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-800 border-b border-gray-200    ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between ml-2">
            <LeftNav />
            <RightNav/>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNavbar;
