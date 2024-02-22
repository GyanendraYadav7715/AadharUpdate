import React from "react";

const Footer = () => {
  const footerLinks = [
    { text: "About", href: "#" },
    { text: "Privacy Policy", href: "#" },
    { text: "Licensing", href: "#" },
    { text: "Contact", href: "#", rel: "noopener noreferrer" },
  ];

  return (
    <div className="sm:ml-64">
      <div className=" border-gray-200 border-dashed  dark:border-gray-700">
        <footer className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-800 shadow">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="flex items-center justify-between mb-4 sm:mb-0">
              <a
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="https://uidai.gov.in/images/langPage/Page-1.svg"
                  className="h-8"
                  alt="AadharUpdate Logo"
                />
                <span className="text-2xl font-semibold whitespace-nowrap text-white">
                  AadharUpdate
                </span>
              </a>
              <ul className="flex flex-wrap items-center text-sm font-medium text-white">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="hover:underline me-4 md:me-6"
                      rel={link.rel}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="my-6 border-white sm:mx-auto lg:my-8" />
            <span className="block text-sm text-white sm:text-center">
              2023{" "}
              <a href="/" className="hover:underline">
                AadharUpdate™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
