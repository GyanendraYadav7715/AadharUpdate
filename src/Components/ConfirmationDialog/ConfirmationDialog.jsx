import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onDismiss }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleDismiss = () => {
    onDismiss();
  };

  return (
    <div>
      <div className="text-red-500 text-lg">{message}</div>
      <div className="flex items-center justify-around">
        <button
          onClick={handleConfirm}
          className="px-8 py-2 bg-green-500 text-white rounded-md"
        >
          Yes
        </button>
        <button
          onClick={handleDismiss}
          className="px-8 py-2 bg-black text-white rounded-md"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
