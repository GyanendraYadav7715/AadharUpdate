import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);

// to prevent Code from Inspect 
// document.onkeydown = (e) => {
//   if (e.key == 123) {
//     e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key == 'I') {
//     e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key == 'C') {
//     e.preventDefault();
//   }
//   if (e.ctrlKey && e.shiftKey && e.key == 'J') {
//     e.preventDefault();
//   }
//   if (e.ctrlKey && e.key == 'U') {
//     e.preventDefault();
//   }

// };
