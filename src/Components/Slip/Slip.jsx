import React from "react";
import "./Slip.css";
import axios from "axios";
import { Local_Url } from "../../constant/constant";

function Slip() {


  
  const handleClick = async (aadhaar) => {
    try {
   


      // Make a GET request using Axios to fetch the image data
      const response = await axios.get(`${Local_Url}/api/v1/retailer/ackSlip`, {
        responseType: 'blob', // Specify response type as blob to receive binary data
        headers: {
          Accept: 'image/jpeg', // Specify that we expect an image (JPEG) in the response
        },
        params: { aadhaar: parseInt(aadhaar) } 
      });

      // Create a URL for the blob data
      const imageUrl = URL.createObjectURL(response.data);

      // Open the image URL in a new tab
      window.open(imageUrl);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };
  return (
    <>
      <div id="Reciept">
        <button id="Original" className="button">
          Original Slip
        </button>
        <button className="Progress button">In Progress</button>
      </div>
      <div className="AckSlip">
        <button className="Ackslip button"  onClick={handleClick}>Ack Slip</button>
      </div>

      <div className="Action">
        <h4 className="Action-text">Action</h4>
        <button className="button">
          <i className="ri-edit-2-fill pencil"></i>
        </button>
      </div>
    </>
  );
}

export default Slip;
