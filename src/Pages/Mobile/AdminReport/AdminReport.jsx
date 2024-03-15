import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";

const AdminReport = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }
  const title = "Mobile Update-Report";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "Mobile Update-Report", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "Mobile Update-Report", href: "" },
        ];
  const tableRef = useRef(null);

  const products = [
    {
      appliedBy: "UP_UID_NS_3203",
      aadharCardDetails: {
        // Fixed object structure
        Name: "Kabutari Devi",
        FatherName: "Ramawatar Yadva",
        DOB: "01/01/1962",
        AadhaarNo: "2323-3434-4545",
        MobileNo: "233445667",
        Email: "Ck812@gmail.com",
        Address: "",
      },
      purpose: "Mobile NO Update",
      adminRemark: "", // Corrected spacing
      createdOn: "11/12/2012",
    },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <h3 className="text-2xl font-semibold">ADMIN</h3>
          <div className="flex items-center justify-between my-4">
            <div>
              <CopyButton data={products} />
              <ExcelButton data={products} filename={"AdminReport.xlsx"} />
              <CSVButton data={products} filename={"AdminReport.csv"} />
              <PDFButton tableRef={tableRef} filename={"AdminReport.pdf"} />
            </div>
            <SearchElement />
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
                    Applied By
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Aadhar Card Details
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Purpose & Status
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Admin Remark
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Created On
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
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border">
                      {product.appliedBy}
                    </td>
                    <td className="px-6 py-4 border">
                      {Object.values(product.aadharCardDetails).join(", ")}
                    </td>
                    <td className="px-6 py-4 border">{product.purpose}</td>
                    <td className="px-6 py-4 border">{product.adminRemark}</td>
                    <td className="px-6 py-4 border">{product.createdOn}</td>
                    <td className="px-6 py-4 border flex items-center justify-between gap-3">
                      <Link
                        to="/user-edit"
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-edit-box-line text-white"></i>
                      </Link>
                      <Link
                        to="/user-finger"
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-fingerprint-fill text-white"></i>
                      </Link>
                      <Link
                        to="#"
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-eye-line text-white"></i>
                      </Link>
                      <Link
                        to="#"
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-red-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-delete-bin-line text-white"></i>
                      </Link>
                      <Link
                        to="/akUpload"
                        className="font-medium text-white no-underline border-1 bg-green-600 px-6 py-3 rounded-md"
                      >
                        Upload
                      </Link>
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

export default AdminReport;
