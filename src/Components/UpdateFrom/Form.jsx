import React from 'react';
import form  from  "../../../public/form.pdf"
const DownloadButton = (btntitle) => {
  const handleDownload = () => {
    // Replace 'path/to/your/file.pdf' with the actual path to your PDF file
     

    // Create a hidden anchor element
    const a = document.createElement('a');
    a.href = form;

    // Set the download attribute with the filename you want
    a.download = 'UpdateForm.pdf';

    // Append the anchor to the body and trigger a click event to start download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
  };

  return (
    <button onClick={handleDownload}>{btntitle}</button>
  );
};

export default DownloadButton;
