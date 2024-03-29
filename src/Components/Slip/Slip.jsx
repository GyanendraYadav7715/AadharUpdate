import React, { useState } from "react"; // Import useState
import axios from "axios";
import { Local_Url } from "../../constant/constant";
import "./Slip.css";
import { toast } from "react-toastify";
import Loader from "../Loder/Loder"; // Assuming the component is named Loader

function Slip({ fileUrl, mobileUserData }) {
  const handleDownload = () => {
    window.open(fileUrl, "_blank");
  };

  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state

  const handleClick = async () => {
    try {
      if (mobileUserData && mobileUserData._id) {
        const { _id: id } = mobileUserData;

        setIsLoading(true);
        const response = await axios.get(
          `${Local_Url}/api/v1/retailer/ackSlip/${id}`,
          {
            responseType: "blob",
            headers: {
              Accept: "image/jpeg",
            },
          }
        );
          
        const imageUrl = URL.createObjectURL(response.data);
        window.open(imageUrl, "_blank");
      } else {
        toast.error("Mobile user data is missing or undefined.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching image data."
      );
      console.error("Error fetching image data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div id="Reciept">
        <button id="Original" className="button" onClick={handleDownload}>
          Original Slip
        </button>
      </div>
      <div>
        <div className="AckSlip">
          <button
            className={`Ackslip button p-3 whitespace-nowrap ${isLoading ?"bg-white":"bg-blue-500"}`}
            onClick={handleClick}
          >
            {isLoading ? <Loader /> : " Ack Slip"}
            
          </button>
        </div>
      </div>
    </>
  );
}

export default Slip;
