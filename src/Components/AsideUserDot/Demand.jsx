import React from "react";
import Dot from "/green-dot.gif";
import IPAddress from "../HeaderNabar/InternetProtocol/IPAddress";
import wifi from "/IceZ.gif";

const RightNav = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const Name = userData.Name;

  return (
    <div className="border-b border-gray-400">
      <div className="flex flex-col items-center ms-3">
        <div className="flex">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
          >
            <img
              className="w-16 h-w-16 rounded-full"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/user-3711850-3105265.png"
              alt="user photo"
            />
          </button>
          <img src={Dot} alt="Dot" className="size-8 rounded-full" />
        </div>
        <div className="mr-9 flex items-center ms-3">
          <div className="">
            <p className="text-base text-gray-900 text-center">{Name}</p>
            <p className="text-base font-semibold text-gray-900 text-center">
              Welcome
            </p>
            <p className="text-base font-medium text-red-700 text-center flex items-center justify-center whitespace-nowrap">
              <img src={wifi} alt="wifi" className="w-8 h-6 rounded-full" /> IP
              ADDRESS:{" "}
              <span className="ml-2">
                <IPAddress />
              </span>
            </p>
            <p className="ml-5 text-lg"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNav;
