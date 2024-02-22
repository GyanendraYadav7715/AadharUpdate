import React from "react";
import { Link } from "react-router-dom";
import { CgFormatSlash } from "react-icons/cg";

const Breadcrumb = ({ title, links, mylinks }) => {
  return (
    <>
      <div className=" sm:ml-64">
        <div className="mt-14">
          <div
            className="flex h-24 bg-white shadow-lg  py-4 px-4 items-center justify-between"
            aria-label="Breadcrumb"
          >
            <div>
              <h4 className="text-gray-800 mb-3">{title}</h4>
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {links.map((link, index) => (
                  <li key={index} className="inline-flex items-center">
                    {link.href ? (
                      <Link
                        to={link.href}
                        className="inline-flex items-center text-sm font-medium text-gray-700 no-underline"
                      >
                        {link.title}
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-sm font-medium text-gray-700 no-underline">
                        {link.title}
                      </span>
                    )}
                    {index < links.length - 1 && (
                      <div className="flex items-center">
                        <CgFormatSlash />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-center gap-3">
              {mylinks &&
                mylinks.length > 0 &&
                mylinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className=" bg-[#71B944] no-underline text-white rounded-full border-1 px-3 py-2 hover:bg-green-500 flex items-center justify-center"
                  >
                    <i className={link.icon}></i> {link.text}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
