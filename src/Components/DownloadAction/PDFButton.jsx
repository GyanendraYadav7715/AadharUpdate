import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PDFButton = ({ tableRef,filename }) => {
  const exportToPDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(filename);
    });
  };

  return (
    <button
      onClick={exportToPDF}
      className="px-6 py-3 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-red-700"
    >
      PDF
    </button>
  );
};

export default PDFButton;
