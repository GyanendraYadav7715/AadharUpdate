import React, { useState } from "react";
import axios from "axios";
import { Local_Url } from "../../constant/constant";

const FileUpload = ({ title, name, onFileUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [captureCount, setCaptureCount] = useState(0);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    if (file.size > 5000000) {
      alert("File size exceeds 5MB. Please select a smaller file.");
      return;
    }
    if (captureCount < 3 && !isLoading) setIsLoading(true);
    try {
      const imageUrl = await uploadToS3(file);
      console.log(imageUrl);
      setFileUploaded(true);
      onFileUpload(imageUrl);
      setCaptureCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadToS3 = async (file) => {
    const formData = new FormData();
    formData.append("document", file, `pdfFile_${Date.now()}.pdf`);

    try {
      const apiUrl = `${Local_Url}/api/v1/retailer/retailer-fingerdata`;
      const response = await axios.post(apiUrl, formData);
      // console.log("File uploaded successfully:", response.data.imageUrl);
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return (
    <div className="mt-4 text-center p-6 box-border shadow-lg flex flex-col items-center border-2 border-[#00000061] hover:border-sky-400 rounded-md">
      {fileUploaded ? (
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src="https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif"
            alt="Uploaded File"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={captureCount >= 3}
            id="fileInput"
            max="5000" // Max size in KB, 5000 KB = 5 MB
          />
          <p className="mb-3">{title}</p>
          <label htmlFor="fileInput" className="cursor-pointer">
            {isLoading ? (
              <img
                className="w-24 h-24 object-cover rounded-full"
                src="https://i.gifer.com/origin/7d/7d3a8639eb21b4dd2572653b476daf7a.gif"
                alt="Uploading File"
              />
            ) : (
              <img
                className="w-24 h-24 object-cover rounded-full"
                src="https://cdn.pixabay.com/animation/2023/06/13/15/13/15-13-08-190_512.gif"
                alt="Upload File"
              />
            )}
          </label>
          <p className="mt-4">
            {isLoading ? "Uploading..." : `Click to upload a ${name}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
