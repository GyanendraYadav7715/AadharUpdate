import React, { useRef } from "react";
import CopyButton from "../../../Components/DownloadAction/CopyButton"
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton"; 
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";

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

 
 
   
  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <h2 className="text-2xl font-semibold">ADMIN</h2>
          <div className="flex items-center justify-between my-4">
            <div>
              <CopyButton data={products} />
              <ExcelButton data={products} filename={"MobileDataList.xlsx"} />
              <CSVButton data={products} filename={"MobileDataList.csv"} />
              <PDFButton tableRef={tableRef} filename={"MobileDataList.pdf"} />
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
                {products.length < 0 ? (
                  products.map((product, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                    >
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap   border ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap   border">
                        {product.childName}
                      </td>
                      <td className="px-6 py-4 border">{product.DOB}</td>
                      <td className="px-6 py-4 border">{product.aadhaar}</td>
                      <td className="px-6 py-4 border">{product.mobile}</td>
                      <td className="px-6 py-4 border">{product.email}</td>
                      <td className="px-6 py-4 border">{product.createdOn}</td>
                      <td className="px-6 py-4 border">{product.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">
                      <h1 className="list-record text-center text-xl">
                        Record Not Found😞
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileData;
