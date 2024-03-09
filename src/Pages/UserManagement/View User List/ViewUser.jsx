import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Local_Url } from "../../../constant/constant";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { Link } from "react-router-dom";

const ViewUser = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Local_Url}/api/v1/admin/all-users`);
      setData(response.data.data);
      console.log(response.data)
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const deleteProduct = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${Local_Url}/api/v1/admin/users/${userId}`);
        const updatedData = data.filter((user) => user.id !== userId);
        setData(updatedData);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <Breadcrumb
        title="View User Data"
        links={[
          { title: "Home", href: "/superadmin" },
          { title: "View User Data", href: "" },
        ]}
        mylinks={[
          {
            to: "/adduser",
            text: "Create New",
            icon: "ri-add-line text-white text-2xl",
          },
        ]}
      />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">View User Data-ADMIN</h3>
          <div className="flex items-center justify-between mb-4 mt-4">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"ViewUser.xlsx"} />
              <CSVButton data={data} filename={"ViewUser.csv"} />
              <PDFButton tableRef={tableRef} filename={"ViewUser.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              className="w-full text-sm text-left rtl:text-right text-black shadow-sm"
              ref={tableRef}
            >
              <thead className="text-base text-black bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 border whitespace-nowrap"
                  >
                    S.No.
                  </th>
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
                    Mobile Number
                  </th>
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
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Created At
                  </th>
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
                    Child Point
                  </th>
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
                    Status
                  </th>
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
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border">
                      {product.Name}
                    </td>
                    <td className="px-6 py-4 border">{product.Phone_n}</td>
                    <td className="px-6 py-4 border">{product.Username}</td>
                    <td className="px-6 py-4 border">{product.Password}</td>
                    <td className="px-6 py-4 border">{product.createdAt}</td>
                    <td className="px-6 py-4 border">{product.Balance}</td>
                    <td className="px-6 py-4 border">{product.Child_token}</td>
                    <td className="px-6 py-4 border">{product.mobilePoint}</td>
                    <td className="px-6 py-4 border">
                      {product.isUserblocked?"Inactive":"Active"}
                    </td>
                    <td className="px-6 py-4 gap-2 flex items-center justify-between">
                      <Link
                         
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-refresh-line text-white"></i>
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-red-600 px-3 py-3 rounded-md"
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
