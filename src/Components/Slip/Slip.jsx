import React from "react";
import axios from "axios";
import { Local_Url } from "../../constant/constant";
import "./Slip.css";
import { toast } from "react-toastify";

function Slip({ fileUrl, mobileUserData }) {
  const handleDownload = () => {
    window.open(fileUrl, "_blank");
  };

  const handleClick = async () => {
    try {
      // Check if 'mobileUserData' is defined before accessing its properties
      if (mobileUserData && mobileUserData._id) {
        const { _id: id } = mobileUserData;

        const response = await axios.get(
          `${Local_Url}/api/v1/retailer/ackSlip/${id}`,
          {
            responseType: "blob",
            headers: {
              Accept: "image/jpeg",
            },
          }
        );

        // Create a URL for the blob data
        const imageUrl = URL.createObjectURL(response.data);

        // Open the image URL in a new tab
        window.open(imageUrl, "_blank");
      } else {
        toast.error("Mobile user data is missing or undefined.");
      }
    } catch (error) {
      // Handle errors gracefully
      toast.error(
        error.response?.data?.message || "Error fetching image data."
      );
      console.error("Error fetching image data:", error);
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
            className="Ackslip button p-3 whitespace-nowrap"
            onClick={handleClick}
          >
            Ack Slip
          </button>
        </div>
      </div>
    </>
  );
}

export default Slip;
