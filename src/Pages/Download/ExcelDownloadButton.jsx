import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const ExcelDownloadButton = ({ jsonData, fileName }) => {
  
  const convertToExcel = () => {

    // Convert JSON to worksheet
    const ws = XLSX.utils.json_to_sheet(jsonData);

    // Create a workbook with a single sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `${fileName}.xlsx`);
  };

  return (
    <button onClick={convertToExcel} className="DownloadFormate-button">
      Excel
    </button>
  );
}
export default ExcelDownloadButton;
