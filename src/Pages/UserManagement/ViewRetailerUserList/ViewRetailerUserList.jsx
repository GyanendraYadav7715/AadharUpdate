import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../../constant/constant";

const ViewRetailerUserList = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${Local_Url}/api/v1/admin/get-all-retailer`
        );
        const responseData = response.data.data.map(user => ({ ...user, status: "Active" }));
        setData(responseData);
        setFilteredProducts(responseData);
      } catch (error) {
        console.error("Something went wrong while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((product) =>
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleStatusEdit = async (Username, isUserblocked) => {
    try {
      const response = await axios.post(
        `${Local_Url}/api/v1/admin/block-retailer`,
        {
          Username,
          User_type: "Retailer",
          isUserblocked,
        }
      );
      alert(response.data.message);

      const updatedProducts = filteredProducts.map((product) => {
        if (product.Username === Username) {
          product.status = isUserblocked === "true" ? "Inactive" : "Active";
        }
        return product;
      });
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <>
      <Breadcrumb title="View Retailer User Data" links={[{ title: "Home", href: "/superadmin" }, { title: "View Retailer User Data" }]} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">View Retailer Users Data-ADMIN</h3>
          <div className="flex items-center justify-between my-4 ">
            <div>
              <CopyButton data={filteredProducts} />
              <ExcelButton data={filteredProducts} filename={"ViewRetailerUserList.xlsx"} />
              <CSVButton data={filteredProducts} filename={"ViewRetailerUserList.csv"} />
              <PDFButton tableRef={tableRef} filename={"ViewRetailerUserList.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-black shadow-sm" ref={tableRef}>
              <thead className="text-base text-black bg-white">
                <tr>
                  <th scope="col" className="px-2 py-3 border">Serial No.</th>
                  <th scope="col" className="px-6 py-3 border">Name</th>
                  <th scope="col" className="px-6 py-3 border">Email</th>
                  <th scope="col" className="px-6 py-3 border">Mobile No.</th>
                  <th scope="col" className="px-6 py-3 border">Created By</th>
                  <th scope="col" className="px-6 py-3 border">Password</th>
                  <th scope="col" className="px-6 py-3 border">Balance</th>
                  <th scope="col" className="px-6 py-3 border">Status</th>
                  <th scope="col" className="px-6 py-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border">{product.Name}</td>
                    <td className="px-6 py-4 border">{product.Email}</td>
                    <td className="px-6 py-4 border">{product.Phone_n}</td>
                    <td className="px-6 py-4 border">{product.createdBy}</td>
                    <td className="px-6 py-4 border">{product.Password}</td>
                    <td className="px-6 py-4 border">{product.Balance}</td>
                    <td className="px-6 py-4 border">{product.status}</td>
                    <td className="px-6 py-4 gap-2 flex items-center justify-between">
                      <button onClick={() => handleStatusEdit(product.Username, "false")} className="font-medium text-white no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md">Activate</button>
                      <button onClick={() => handleStatusEdit(product.Username, "true")} className="font-medium text-white no-underline hover:underline border-1 bg-red-600 px-3 py-3 rounded-md">Deactivate</button>
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
