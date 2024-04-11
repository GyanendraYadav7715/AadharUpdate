import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaptureFinger , CalculateCapturePercentage } from "./mfs100";
import { Local_Url } from "../../constant/constant";
import Loder from "../Loder/Loder";
import axios from "axios";

const Box = ({ onFingerprintUpload }) => {
  const [capturePercantage, setCapturePercantage] = useState(0)
  const [captureCount, setCaptureCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fingerprintCaptured, setFingerprintCaptured] = useState(false);
  const [image, setImage] = useState("");

  const userData = localStorage.getItem("user");
  let userName = "";

  if (userData) {
    const userObj = JSON.parse(userData);
    userName = userObj.Username;
  }
  const captureFinger = async () => {
    try {
      const fingerData = await CaptureFinger(100 , 10);

      if (
        fingerData.httpStaus &&
        fingerData.data &&
        fingerData.data.BitmapData
      ) {
        const imageBlob = await convertBase64ToBlob(fingerData.data.BitmapData);

        // Calculate capture percentage
        const calculatedPercentage = CalculateCapturePercentage(
          fingerData.data.Quality,
          fingerData.data.Nfiq
        );

        // console.log("Capture Percentage:", calculatedPercentage);
        setCapturePercantage(calculatedPercentage);

        // Check if capture percentage is less than 50%
        if (calculatedPercentage < 60) {
          toast.error("Capture percentage is less than 50%. Please try again.");
          return null; // Indicate that capture percentage is less than 50%
        }

        return imageBlob;
      } else {

        toast.error("Capture Percentage Error");
        return null;
      }
    } catch (error) {
      console.error("Error capturing finger:", error);
      return null;
    }
  };

  

  const captureFingerAndUpload = async () => {
    if (captureCount < 5 && !isLoading) {
      setIsLoading(true);
      try {
        const imageBlob = await captureFinger();

        if (imageBlob) {
          await uploadToS3(imageBlob);
          setCaptureCount((prevCount) => prevCount + 1);
          setFingerprintCaptured(true); // Update state to indicate fingerprint captured
        }
      } catch (error) {
        console.error("Error capturing or uploading finger:", error);
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
    formData.append("document", imageBlob, `f_${Date.now()}.jpg`);

    try {
      const response = await axios.post(
        `${Local_Url}/api/v1/retailer/retailer-fingerdata?userName=${userName}`,
        formData
      );

      const image = response.data.imageUrl;
      setImage(image);

      onFingerprintUpload(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading fingerprint:", error);
    }
  };

  return (
    <div className="m-4 text-center p-6 box-border shadow-lg flex flex-col items-center   border-2 border-[#00000061] hover:border-sky-400 rounded-md">
      {fingerprintCaptured ? (
        <div className="flex flex-col items-center justify-center">
          <img className="w-24 h-24 object-cover" src={image} alt="Box" />

          {/* <img
            className="w-12 h-12 object-cover rounded-full"
            src="https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif"
            alt="Uploaded File"
          /> */}
          <p className="mt-4 px-8 py-1.5 border border-blue-500 text-blue-500 rounded-md transition duration-300   whitespace-nowrap" >{capturePercantage}%</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center  ">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src="https://i.pinimg.com/originals/4b/ae/55/4bae5522eab2c92ae104801515cec7c6.gif"
            alt="Box"
          />
          <button
            className="mt-4 px-8 py-1.5 border border-blue-500 text-blue-500 rounded-md transition duration-300 hover:bg-[#17a2b8] hover:text-white whitespace-nowrap"
            type="button"
            onClick={captureFingerAndUpload}
            disabled={captureCount >= 5}

          >
            {isLoading ? <Loder /> : "Click"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Box;
