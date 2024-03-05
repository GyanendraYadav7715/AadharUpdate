import React, { useState } from "react";
import finger from "../../../public/finger.jpg";
import { CaptureFinger } from "./mfs100";
import { Local_Url } from "../../constant/constant";
import Loder from "../../Loder/Loder";
import axios from "axios";

const Box = ({ onFingerprintUpload }) => {
  const [captureCount, setCaptureCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const captureFingerAndUpload = async () => {
    if (captureCount < 5 && !isLoading) {
      setIsLoading(true);
      try {
        const fingerData = await CaptureFinger();

        if (
          fingerData.httpStatus &&
          fingerData.data &&
          fingerData.data.BitmapData
        ) {
          const imageBlob = await convertBase64ToBlob(
            fingerData.data.BitmapData
          );
          await uploadToS3(imageBlob);
          setCaptureCount((prevCount) => prevCount + 1);
          console.log(fingerData.data.BitmapData);
        } else {
          alert("Finger Not Found");
        }
      } catch (error) {
        console.error("Error capturing finger:", error);
      } finally {
        setIsLoading(false);
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

  const uploadToS3 = async (imageBlob) => {
    const formData = new FormData();
    formData.append("image", imageBlob, `fingerprint_${Date.now()}.jpg`);

    try {
      const response = await axios.post(
        `${Local_Url}/api/v1/retailer/reatailer-fingerdata`,
        formData
      );
      console.log("Fingerprint uploaded successfully:", response.data.imageUrl);

      // Call the callback function with the URL of the uploaded fingerprint image
      onFingerprintUpload(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading fingerprint:", error);
    }
  };

  return (
    <div className="m-4 text-center p-6 box-border shadow-lg flex flex-col items-center   border-1">
      <img className="w-24 h-24 object-cover" src={finger} alt="Box" />
      <button
        className="mt-4 px-8 py-1.5 border border-blue-500 text-blue-500 rounded-md transition duration-300 hover:bg-blue-500 hover:text-white"
        type="button"
        onClick={captureFingerAndUpload}
        disabled={captureCount >= 5}
      >
        {isLoading ? <Loder /> : "Capture Finger"}
      </button>
      <p>{`Fingerprints captured: ${captureCount} / 5`}</p>
    </div>
  );
};

export default Box;
