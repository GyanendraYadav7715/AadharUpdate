import React from "react";

import "./Slip.css";

function Slip({ fileUrl })


{

  const handleClick = async () => {
    try {
      // Extract the ID from mobileUserData
      const { _id: id } = mobileUserData;

      // Make a GET request using Axios to fetch the image data
      const response = await axios.get(`${Local_Url}/api/v1/retailer/ackSlip/${id}`, {
        responseType: 'blob',
        headers: {
          Accept: 'image/jpeg',
        },
      });

      // Create a URL for the blob data
      const imageUrl = URL.createObjectURL(response.data);

      // Open the image URL in a new tab
      window.open(imageUrl);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  const handleDownload = () => {
    // Implement download logic here
    window.open(fileUrl, "_blank");
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
          <button className="Ackslip button p-3 whitespace-nowrap"  onClick={handleClick}>
            Ack Slip
          </button>
        </div>
      </div>
    </>
  );
}

export default Slip;
