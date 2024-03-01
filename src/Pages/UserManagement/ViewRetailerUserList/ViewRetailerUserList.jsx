import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
 
const ViewRetailerUserList = () => {
  //Breadcrumb Data
  const title = "View Retailer User Data";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "View Retailer User Data", href: "" },
  ];
  // Define and initialize the tableRef
  const tableRef = useRef(null);

  // Define products array
  const products = [
    {
      name: "Ashok Singh",
      email: "AshokAgmail.com",
      mobile: "2223765698",
      createdBy: "Admin",
      password: "Ashok@889#",
      balance: "500",
      status: "Active",
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      mobile: "1234567890",
      createdBy: "User",
      password: "johnDoe123!",
      balance: "1000",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "janesmith@yahoo.com",
      mobile: "9876543210",
      createdBy: "Admin",
      password: "janeSmith789$",
      balance: "750",
      status: "Active",
    },
    {
      name: "Michael Johnson",
      email: "michaelj@gmail.com",
      mobile: "5557891234",
      createdBy: "User",
      password: "mikeJ123#",
      balance: "2000",
      status: "Active",
    },
    {
      name: "Emily Brown",
      email: "emilyb@hotmail.com",
      mobile: "1112223333",
      createdBy: "Admin",
      password: "emilyBrown456%",
      balance: "300",
      status: "Active",
    },
    {
      name: "David Lee",
      email: "davidlee@gmail.com",
      mobile: "7778889999",
      createdBy: "User",
      password: "davidLee777*",
      balance: "1200",
      status: "Active",
    },
    {
      name: "Michelle Martinez",
      email: "mmartinez@yahoo.com",
      mobile: "3336669999",
      createdBy: "Admin",
      password: "michelleM111*",
      balance: "900",
      status: "Active",
    },
    {
      name: "Robert Wilson",
      email: "robertwilson@hotmail.com",
      mobile: "4445556666",
      createdBy: "User",
      password: "robertW456$",
      balance: "1500",
      status: "Active",
    },
    {
      name: "Jessica Davis",
      email: "jessicadavis@gmail.com",
      mobile: "6663339999",
      createdBy: "Admin",
      password: "jessicaD789%",
      balance: "600",
      status: "Active",
    },
    {
      name: "William Thompson",
      email: "wthompson@yahoo.com",
      mobile: "9998887777",
      createdBy: "User",
      password: "williamT123!",
      balance: "1800",
      status: "Active",
    },
  ];
   

  return (
    <>
      <Breadcrumb title={title} links={links} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">
            View Retailer Users Data-ADMIN
          </h3>
          <div className="flex items-center justify-between my-4 ">
            <div>
              <CopyButton data={products} />
              <ExcelButton
                data={products}
                filename={"ViewRetailerUserList.xlsx"}
              />
              <CSVButton
                data={products}
                filename={"ViewRetailerUserList.csv"}
              />
              <PDFButton
                tableRef={tableRef}
                filename={"ViewRetailerUserList.pdf"}
              />
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
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Mobile No.
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Created By
                  </th>
                  <th scope="col" className="px-6 py-3 border">
                    Password
                  </th>

                  <th scope="col" className="px-6 py-3 border">
                    Balance
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
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap   border ">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap   border">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 border">{product.email}</td>
                    <td className="px-6 py-4 border">{product.mobile}</td>
                    <td className="px-6 py-4 border">{product.createdBy}</td>
                    <td className="px-6 py-4 border">{product.password}</td>
                    <td className="px-6 py-4 border">{product.balance}</td>

                    <td className="px-6 py-4 border">{product.status}</td>
                    <td className="px-6 py-4 gap-2 flex items-center justify-between">
                      <Link
                        to="/editstatus"
                        className="font-medium text-white no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                      >
                        Edit Status
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

export default ViewRetailerUserList;
