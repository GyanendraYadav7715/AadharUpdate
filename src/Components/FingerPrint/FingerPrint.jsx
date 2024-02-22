import React from "react";
import finger from "../../../public/finger.jpg";

const Box = () => {
  return (
    <div className="m-4 text-center p-6 box-border shadow-lg flex flex-col items-center   border-1">
      <img className="w-24 h-24 object-cover" src={finger} alt="Box" />
      <button className="mt-4 px-8 py-1.5 border border-blue-500 text-blue-500 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white">
        Click
      </button>
    </div>
  );
};

export default Box;
