import React, { useRef,useEffect,useState } from "react";
import CopyButton from "../../../Components/DownloadAction/CopyButton"
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton"; 
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import { Local_Url } from "../../../constant/constant";
import axios from "axios";
 
const MobileData = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  let userName = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
    userName = userObj.Username;
  }
    const [data, setData] = useState([]);
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
  useEffect(() => {
     const apiUrl = `${Local_Url}/api/v1/retailer/mobileUsers`;
    axios
      .get(apiUrl, { params: { userName: userName } })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
      });
  })

   

 
 
   
  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <h2 className="text-2xl font-semibold">ADMIN</h2>
          <div className="flex items-center justify-between my-4">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"MobileDataList.xlsx"} />
              <CSVButton data={data} filename={"MobileDataList.csv"} />
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
                  <th scope="col" className="px-2 py-3 border whitespace-nowrap">
                    Serial No.
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    Child Name
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    DOB
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    Aadhaar No.
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    Mobile No.
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    Email ID
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    Created On
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 border whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((product, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                    >
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap   border ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap   border">
                        {product.Name}
                      </td>
                      <td className="px-6 py-4 border">{product.DOA}</td>
                      <td className="px-6 py-4 border">{product.AadhaarNo}</td>
                      <td className="px-6 py-4 border">{product.MobileNo}</td>
                      <td className="px-6 py-4 border">{product.Email}</td>
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
