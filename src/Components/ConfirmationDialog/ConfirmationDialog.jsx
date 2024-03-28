import React, { useEffect, useRef } from "react";

const ConfirmationDialog = ({ message, onConfirm, onDismiss }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onDismiss();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onDismiss]);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.focus();
    }
  }, []);
  const handleConfirm = () => {
    onConfirm();
  };

  const handleDismiss = () => {
    onDismiss();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={dialogRef}
        className="bg-white p-8 rounded shadow-lg border-2"
        tabIndex="-1"
      >
        <p className="text-lg font-bold mb-4">Confirmation</p>
        <p className="mb-4">{message}</p>
        <div className="actions">
          <button
            aria-label="Close"
            className="cursor-pointer font-bold bg-black rounded w-36 text-white text-center py-2.5 px-5 mr-2"
            onClick={handleDismiss}
          >
            Close
          </button>
          <button
            aria-label="Confirm"
            className="cursor-pointer font-bold bg-green-500 rounded w-36 text-white text-center py-2.5 px-5"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
