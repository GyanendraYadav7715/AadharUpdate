import React from "react";
import { CSVLink } from "react-csv";

const CSVButton = ({ data, filename }) => {
  return (
    <button className="px-6 py-3 mr-2 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-yellow-700">
      <CSVLink
        data={data}
        filename={filename}
        className="no-underline text-white"
      >
        CSV
      </CSVLink>
    </button>
  );
};

export default CSVButton;
