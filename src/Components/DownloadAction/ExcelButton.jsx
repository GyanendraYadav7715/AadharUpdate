import React from "react";
import * as XLSX from "xlsx";

const ExcelButton = ({ data, filename }) => {
  const exportToExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, filename);
      console.log("Exporting to Excel successful");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <button
      onClick={exportToExcel}
      className="px-6 py-3 mr-2 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-green-700"
    >
      Excel
    </button>
  );
};

export default ExcelButton;
