 import React from "react";

 class FileUpload extends React.Component {
   // Function to handle file selection
   handleFileSelect = (event) => {
     const files = event.target.files; // Get the selected files
     // You can now perform actions with the selected files, such as uploading them to a server or displaying them on the page.
     console.log(files);
   };

   // Function to handle drag over
   handleDragOver = (event) => {
     event.preventDefault();
     event.stopPropagation();
     // Add styles to indicate drag over
     event.target.classList.add("border-blue-500"); // Add your preferred border color class here
   };

   // Function to handle drag leave
   handleDragLeave = (event) => {
     event.preventDefault();
     event.stopPropagation();
     // Remove styles when drag leaves
     event.target.classList.remove("border-blue-500"); // Remove your preferred border color class here
   };

   // Function to handle drop
   handleDrop = (event) => {
     event.preventDefault();
     event.stopPropagation();
     event.target.classList.remove("border-blue-500"); // Remove your preferred border color class here
     const files = event.dataTransfer.files; // Get the dropped files
     // You can now perform actions with the dropped files, such as uploading them to a server or displaying them on the page.
     console.log(files);
   };

   render() {
     return (
       <div className="flex items-center justify-center w-full">
         <label
           htmlFor="dropzone-file"
           className="dropzone flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
           onDragOver={this.handleDragOver}
           onDragLeave={this.handleDragLeave}
           onDrop={this.handleDrop}
         >
           <div className="flex flex-col items-center justify-center pt-5 pb-6">
             <svg
               className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
               aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 20 16"
             >
               <path
                 stroke="currentColor"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
               />
             </svg>
             <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
               <span className="font-semibold">Click to upload</span> or drag
               and drop
             </p>
             <p className="text-xs text-gray-500 dark:text-gray-400">
               SVG, PNG, JPG or GIF (MAX. 800x400px)
             </p>
           </div>
           <input
             id="dropzone-file"
             type="file"
             className="hidden"
             onChange={this.handleFileSelect}
           />
         </label>
       </div>
     );
   }
 }

 export default FileUpload;
