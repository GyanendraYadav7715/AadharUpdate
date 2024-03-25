import React from "react";

import "./Slip.css";

function Slip({ fileUrl }) {
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
          <button className="Ackslip button p-3 whitespace-nowrap" onClick={handleDownload}>
            Ack Slip
          </button>
        </div>
      </div>
    </>
  );
}

export default Slip;
