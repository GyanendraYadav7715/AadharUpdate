import { useRef } from "react";
import { Link } from "react-router-dom";
import loginlogo from "../../public/loginlogo.webp";

const Forget = () => {
  const userRef = useRef();

  return (
    <>
      <div className="max-w-[350px] mx-auto  w-screen h-screen">
        <div className="flex flex-col items-center   pt-[10vh]">
          <img
            src={loginlogo}
            className=" object-cover w-1/2 h-1/2 mb-[5vh]"
            alt="Logo"
          />

          <form>
            <div className="relative">
              <label htmlFor="email" className="mb-[1vh]">
                Username or Email
              </label>
              <input
                type="text"
                className="w-full px-6 py-3 mb-5 border border-slate-600 rounded-lg font-medium "
                placeholder="Username or Email"
                id="user"
                ref={userRef}
              />

              <i className="ri-user-line absolute right-4 top-1/2 transform -translate-y-1/2"></i>
            </div>

            <div className="border-b border-gray-500 pb-[2vh]">
              <button className="bg-blue-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full">
                Reset
              </button>
            </div>
          </form>
          <Link
            to="/"
            className="bg-black hover:bg-slate-800 text-white text-center rounded-lg py-2.5 px-5 transition-colors w-2/3 mt-[3vh] w-full"
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
