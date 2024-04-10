import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const Finger = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(60); // Initial zoom level
  const [invertImage, setInvertImage] = useState(false); // State for image inversion
  const [brightnessLevel, setBrightnessLevel] = useState(100); // Initial brightness level
  const location = useLocation();
  const { fingerprints } = queryString.parse(location.search);
  const searchParams = new URLSearchParams(location.search);
  const aadhar = searchParams.get("aadhar");
  const finger = JSON.parse(decodeURIComponent(fingerprints));
  const fingerprintUrls = finger.map((fingerprint) => {
    const { _id, ...fingerprintWithoutId } = fingerprint; // Exclude _id
    return Object.values(fingerprintWithoutId);
  });

  const pictures = fingerprintUrls.flat();
  console.log(pictures);

  const navigate = useNavigate();
  const picturesPerPage = 1;

  const totalPages = Math.ceil(pictures.length / picturesPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const zoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 10, 200)); // Increase zoom by 10% up to 200%
  };

  const zoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 10, 10)); // Decrease zoom by 10%, ensure minimum zoom is 10%
  };

  const resetZoom = () => {
    setZoomLevel(60); // Reset zoom level to default (100%)
  };

  const downloadImage = (imageUrl) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `picture_${currentPage}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goto = () => {
    navigate("/backoffice");
  };

  const handleInvertImage = () => {
    setInvertImage(!invertImage); // Toggle image inversion
  };

  const adjustBrightness = (value) => {
    setBrightnessLevel(value); // Set brightness level
  };

  const renderPictures = () => {
    const startIndex = (currentPage - 1) * picturesPerPage;
    const endIndex = startIndex + picturesPerPage;
    return pictures.slice(startIndex, endIndex).map((picture, index) => (
      <div key={index} className="flex flex-col items-center">
        <img
          src={picture}
          alt={`Picture ${index}`}
          style={{
            width: `${zoomLevel}%`,
            height: `${zoomLevel}%`,
            filter: `invert(${invertImage ? 1 : 0}) brightness(${brightnessLevel}%) contrast(150%)` // Apply inversion, brightness, and contrast
          }}
          className="object-cover"
        />
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => downloadImage(picture)}
            className="px-5 py-2 border border-red-50 bg-blue-500 hover:bg-blue-600 text-black rounded-md hover:duration-150"
          >
            Download
          </button>
          <button
            onClick={handleInvertImage}
            className="px-5 py-2 border border-red-50 bg-blue-500 hover:bg-blue-600 text-black rounded-md hover:duration-150"
          >
            {invertImage ? "Revert" : "Invert"} Image
          </button>
          <input
            type="range"
            min="0"
            max="200"
            value={brightnessLevel}
            onChange={(e) => adjustBrightness(e.target.value)}
            className="w-40"
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-black min-h-screen text-white px-5 md:px-10 lg:px-20 py-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide mb-3">
        p'S Finger Prints
      </h1>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide">
        <span>{aadhar}</span>Aadhar Number
      </h1>
      <hr className="mt-3" />

      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-3">
        <button
          onClick={goto}
          className="px-5 py-2 border border-red-50 bg-blue-400 hover:bg-blue-500 text-black rounded-md hover:duration-150"
        >
          Back to the Dashboard
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={zoomIn}
            className="px-3 py-1 border border-red-50 bg-gray-100 hover:bg-gray-200 text-black rounded-md hover:duration-150"
          >
            Zoom In
          </button>
          <button
            onClick={zoomOut}
            className="px-3 py-1 border border-red-50 bg-gray-100 hover:bg-gray-200 text-black rounded-md hover:duration-150"
          >
            Zoom Out
          </button>
          <button
            onClick={resetZoom}
            className="px-3 py-1 border border-red-50 bg-gray-100 hover:bg-gray-200 text-black rounded-md hover:duration-150"
          >
            Reset Zoom
          </button>
        </div>
      </div>
      <div className="grid place-items-center mt-10">
        <div className="flex gap-3">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <i className="ri-arrow-left-s-line"></i> Prev
          </button>
          <div>{renderPictures()}</div>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finger;
