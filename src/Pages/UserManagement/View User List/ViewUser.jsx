
import React, { useEffect, useState, useRef } from "react";
import { Local_Url } from "../../../constant/constant";
import axios from "axios";

import { useState, useRef,useEffect } from "react";
import { Link } from "react-router-dom";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Asidebar from "../../../Components/Asidebar/Asidebar";
 import SearchElement from '../../../Components/SearchElement/SearchElement'
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";

const ViewUser = () => {
 const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
   useEffect(() => {
    setFilteredProducts(products);
  }, []);

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
  //Breadcrumb Data
  const [ data , setData] = useState([])
  const title = "View User Data";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "View User Data ", href: "" },
  ];
  const mylinks = [
    {
      to: "/adduser",
      text: "Create New ",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];
  // Define and initialize the tableRef
  const tableRef = useRef(null);
 ;
  // Define products array
     useEffect(() => {
       // Define the API endpoint URL
       const apiUrl = `${Local_Url}/api/v1/admin/all-users`;

       // Make a GET request using Axios
       axios
         .get(apiUrl)
         .then((response) => {
           setData(response.data.data);
           console.log(response.data)
         })
         .catch((err) => {
           console.log("Something Went Wrong");
           setError(err);
         });
     }, []);
  
  
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
  // // Function to handle deletion of a product
  // const deleteProduct = (index) => {
  //   // Create a copy of the products array
  //   const updatedProducts = [...products];
  //   // Remove the product at the specified index
  //   updatedProducts.splice(index, 1);
  //   // Update the state with the modified array
  //   setProducts(updatedProducts);
  // };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">View User Data-ADMIN</h3>
          <div className="flex items-center justify-between mb-4 mt-4">
            <div>
              <CopyButton data={products} />
              <ExcelButton data={products} filename={"ViewUser.xlsx"} />
              <CSVButton data={products} filename={"ViewUser.csv"} />
              <PDFButton tableRef={tableRef} filename={"ViewUser.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg  ">
            <table
              className="w-full text-sm text-left rtl:text-right text-black shadow-sm"
              ref={tableRef}
            >
              <thead className="text-base text-black  bg-white  ">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-2 py-3 border whitespace-nowrap"
                  >
                    Serial No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Created By
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Child Point
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Mobile Point
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border">
                      {product.Name}
                    </td>
                    <td className="px-6 py-4 border">{product.Phone_n}</td>
                    <td className="px-6 py-4 border">{product.Username}</td>
                    <td className="px-6 py-4 border">{product.Password}</td>
                    <td className="px-6 py-4 border">{product.CreateBy}</td>
                    <td className="px-6 py-4 border">{product.Balance}</td>
                    <td className="px-6 py-4 border">{product.Child_token}</td>
                    <td className="px-6 py-4 border">{product.mobilePoint}</td>
                    <td className="px-6 py-4 border">{product.status}</td>
                    <td className="px-6 py-4 gap-2 flex items-center justify-between">
                      <Link
                        to="#"
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                      >
                        <i class="ri-refresh-line text-white"></i>
                      </Link>
                      {/* Add onClick event to delete icon */}
                      <button
                        onClick={() => deleteProduct(index)}
                        className="font-medium text-blue-600 no-underline  hover:underline border-1 bg-red-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-delete-bin-line text-white"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
