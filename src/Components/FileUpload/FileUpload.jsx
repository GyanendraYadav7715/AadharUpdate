import React, { useState } from "react";
import { Local_Url } from "../../constant/constant";
import axios from "axios";

const Box = ({ onFileUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const imageUrl = await uploadToS3(file);
        setFileUploaded(true);
        setUploadedFileUrl(imageUrl);
        onFileUpload(imageUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const uploadToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${Local_Url}/api/v1/retailer/retailer-file-upload`,
        formData
      );
      console.log("File uploaded successfully:", response.data.imageUrl);
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  return (
    <div className="m-4 text-center p-6 box-border shadow-lg flex flex-col items-center border-1">
      {fileUploaded ? (
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-24 h-24 object-cover"
            src={uploadedFileUrl}
            alt="Uploaded File"
          />
          <div className="mt-4 px-8 py-1.5 border border-black text-black rounded-md transition duration-300 font-bold flex items-center justify-center gap-3">
            Success
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <img
              className="w-24 h-24 object-cover"
              src={require("../../../public/upload-icon.jpg")}
              alt="Upload File"
            />
          </label>
          <p className="mt-4">Click to upload a file</p>
          {isLoading && <p className="mt-2">Uploading...</p>}
        </div>
      )}
    </div>
  );
};

export default Box;
