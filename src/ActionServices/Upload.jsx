import React, { useState } from "react";

const UploadButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
        onClick={togglePopup}
      >
        Upload
      </button>

      {isPopupOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={togglePopup}
              className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
              role="menuitem"
            >
              Upload File
            </button>
            {/* Add more options/buttons as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
