import React from "react";
import "./Slip.css";

function Slip() {
  return (
    <>
      <div id="Reciept">
        <button id="Original" className="button">
          Original Slip
        </button>
        <button className="Progress button">In Progress</button>
      </div>
      <div className="AckSlip">
        <button className="Ackslip button">Ack Slip</button>
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
