// FingerprintCapture.js

import React, { useState } from "react";
import { CaptureFinger } from "./mfs100";
import { Base_Url } from "../../constant/constant";
import finger from "../../../public/finger.jpg";

const FingerprintCapture = ({ onFingerprintUpload }) => {
  const [captureCount, setCaptureCount] = useState(0);

  const captureFingerAndUpload = async () => {
    if (captureCount < 5) {
      const fingerData = await CaptureFinger();

      if (
        fingerData.httpStatus &&
        fingerData.data &&
        fingerData.data.BitmapData
      ) {
        const imageBlob = await convertBase64ToBlob(fingerData.data.BitmapData);
        uploadToS3(imageBlob);
        setCaptureCount((prevCount) => prevCount + 1);
        console.log(fingerData.data.BitmapData);
      } else {
        alert("Finger Not Found");
      }
    }
  };

  const convertBase64ToBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: "image/jpeg" });
  };

  const uploadToS3 = (imageBlob) => {
    const formData = new FormData();
    formData.append("image", imageBlob, `fingerprint_${Date.now()}.jpg`);

    fetch(`${Base_Url}/api/v1/retailer/reatailer-fingerdata`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fingerprint uploaded successfully:", data);
        onFingerprintUpload(data); // Pass the entire data object to the parent component
      })
      .catch((error) => {
        console.error("Error uploading fingerprint:", error);
      });
  };

  return (
    <div className="m-4 text-center p-6 box-border shadow-lg flex flex-col items-center   border-1">
      {/* Your existing JSX for the Box component */}
    
        <img className="w-24 h-24 object-cover" src={finger} alt="Box" />
        <button
          className="mt-4 px-8 py-1.5 border border-blue-500 text-blue-500 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white"
          type="button"
          onClick={captureFingerAndUpload}
          disabled={captureCount >= 5}
        >
          Click
        </button>
      </div>

  );
};

export default FingerprintCapture;
