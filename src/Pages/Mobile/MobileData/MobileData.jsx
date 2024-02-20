import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Asidebar from "../../../Components/HeaderNabar/HeaderNavbar";
import HeaderNavbar from "../../../Components/Asidebar/Asidebar";
import Footer from "../../../Components/Footer/Footer";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";

const MobileData = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }
  const title = "Mobile Data";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "Mobile Data", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "Mobile Data", href: "" },
        ];
  const mylinks = [
    {
      to: "/mobiledata",
      text: "Create New",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];
  // Define and initialize the tableRef
  const tableRef = useRef(null);

  // Define products array
  const products = [
    {
      childName: "Gaurav",
      DOB: "01/01/2022",
      aadhaar: "3433-34343-3435",
      mobile: "4554678876",
      email: "raju@gmail.com",
      createdOn: "08/01/2024",
      status: "Success",
    },
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
  };

  // Function to export table data to Excel
  const exportToExcel = () => {
    try {
      // Check if tableRef and tableRef.current exist before calling the download method
      if (tableRef.current && tableRef.current.table) {
        console.log("Exporting to Excel...");
        tableRef.current.table.download("xlsx", "history.xlsx");
      } else {
        console.error("Table or table ref is not defined");
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };
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
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <h3 className="text-2xl font-bold">ADMIN</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 mr-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-blue-700"
              >
                Copy
              </button>
              <button
                onClick={exportToExcel}
                className="px-4 py-2 mr-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-green-700"
              >
                Excel
              </button>
              <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-yellow-700">
                <CSVLink
                  data={products}
                  filename={"history.csv"}
                  className=" no-underline text-white"
                >
                  CSV
                </CSVLink>
              </button>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-red-700 "
              >
                PDF
              </button>
            </div>
             
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
                    Child Name
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    DOB
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Aadhaar No.
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Mobile No.
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Email ID
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Created On
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white border ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white border">
                      {product.childName}
                    </td>
                    <td className="px-6 py-4 border">{product.DOB}</td>
                    <td className="px-6 py-4 border">{product.aadhaar}</td>
                    <td className="px-6 py-4 border">{product.mobile}</td>
                    <td className="px-6 py-4 border">{product.email}</td>
                    <td className="px-6 py-4 border">{product.createdOn}</td>
                    <td className="px-6 py-4 border">{product.status}</td>
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

export default MobileData;
