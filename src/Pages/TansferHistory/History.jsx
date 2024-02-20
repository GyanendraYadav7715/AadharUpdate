import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import SearchElement from "../../Components/SearchElement/SearchElement";
import Asidebar from "../../Components/Asidebar/Asidebar";
import HeaderNavbar from "../../Components/HeaderNabar/HeaderNavbar";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
const History = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef(null);

  // Initialize filteredProducts with the initial data
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Your existing code

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const title = "View Balance Transfer History";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "View Balance Transfer History", href: "" },
  ];

  // Define and initialize the tableRef

  // Define products array
  const products = [
    {
      debitedFrom: "Admin",
      tranferPoint: "500",
      creditedTo: "Rajesh",
      status: "Transfer",
      date: "08/01/2024",
    },
    {
      debitedFrom: "Admin",
      tranferPoint: "800",
      creditedTo: "Jitendar",
      status: "Transfer",
      date: "03/01/2024",
    },
    {
      debitedFrom: "Admin",
      tranferPoint: "5000",
      creditedTo: " Mukesh",
      status: "Transfer",
      date: "08/02/2024",
    },
    {
      debitedFrom: "Admin",
      tranferPoint: "300",
      creditedTo: "Divakar",
      status: "Transfer",
      date: "31/01/2024",
    },
    {
      debitedFrom: "Admin",
      tranferPoint: "200",
      creditedTo: "Priyanka",
      status: "Transfer",
      date: "22/01/2023",
    },
    // Other product objects...
  ];

  // Function to copy data to clipboard
  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = products
      .map((product) => Object.values(product).join("\t"))
      .join("\n");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Cpoied");
  };

  // Function to export table data to Excel
  const exportToExcel = (tableData, fileName) => {
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Convert the table data to a worksheet
      const ws = XLSX.utils.json_to_sheet(tableData);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Save the workbook as an Excel file
      XLSX.writeFile(wb, fileName);

      console.log("Exporting to Excel successful");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };
  // Function to export table as PDF
  const exportToPDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("history.pdf");
    });
  };

  return (
    <>
      <Asidebar />
      <HeaderNavbar />
      <Breadcrumb title={title} links={links} />
      <div className="p-4 sm:ml-64 bg-gray-200 mb-20">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={copyToClipboard}
                className=" px-6 py-3 mr-2 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-blue-700"
              >
                Copy
              </button>
              <button
                onClick={exportToExcel}
                className=" px-6 py-3 mr-2 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-green-700"
              >
                Excel
              </button>
              <button className=" px-6 py-3 mr-2 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-yellow-700">
                <CSVLink
                  data={products}
                  filename={"history.csv"}
                  className=" no-underline text-white"
                >
                  CSV
                </CSVLink>
              </button>
              <button
                onClick={exportToPDF} // Increase scale if necessary
                className=" px-6 py-3 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-red-700 "
              >
                PDF
              </button>
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              className="w-full text-sm text-left rtl:text-right text-black shadow-sm"
              ref={tableRef}
            >
              <thead className="text-base text-black  bg-white  ">
                <tr>
                  <th scope="col" className="px-2 py-3 border">
                    Serial No.
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Debited From
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Transferred Point
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Credited To
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Created On
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border">
                      {product.debitedFrom}
                    </td>
                    <td className="px-6 py-4 border">{product.tranferPoint}</td>
                    <td className="px-6 py-4 border">{product.creditedTo}</td>
                    <td className="px-6 py-4 border">{product.status}</td>
                    <td className="px-6 py-4 border">{product.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default History;
