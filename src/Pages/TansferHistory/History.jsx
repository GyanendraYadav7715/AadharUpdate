import React, { useRef, useState, useEffect, useMemo } from "react";
import axios from "axios";
import CopyButton from "../../Components/DownloadAction/CopyButton";
import CSVButton from "../../Components/DownloadAction/CSVButton";
import PDFButton from "../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../Components/DownloadAction/ExcelButton";
import SearchElement from "../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../constant/constant";

const History = () => {
  //const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const userData = localStorage.getItem("user");
  const userName = userData ? JSON.parse(userData).Username : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${Local_Url}/api/v1/admin/transfer-history`;
        const response = await axios.get(apiUrl, {
          params: { username: userName },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userName]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const memoizedFilteredProducts = useMemo(() => {
    return data.filter((product) =>
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const title = "View Balance Transfer History";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "View Balance Transfer History", href: "" },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} />
      <div className="p-4 sm:ml-64 mb-20">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"history.xlsx"} />
              <CSVButton data={data} filename={"history.csv"} />
              <PDFButton tableRef={tableRef} filename={"History.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              className="w-full text-sm text-left rtl:text-right text-black shadow-sm"
              ref={tableRef}
            >
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-2 py-3 border">
                    S.No.
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
                { data.length > 0 ? (
                  memoizedFilteredProducts.map((product, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                    >
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border">
                        {product.sender}
                      </td>
                      <td className="px-6 py-4 border">{product.amount}</td>
                      <td className="px-6 py-4 border">{product.recipient}</td>
                      <td className="px-6 py-4 border">{product.status}</td>
                      <td className="px-6 py-4 border">
                        {product.transferDate}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <h1 className="list-record text-center text-xl">Record Not Found😞</h1>
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

export default History;
