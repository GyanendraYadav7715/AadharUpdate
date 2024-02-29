import React, { useRef, useState, useEffect } from "react";
import CopyButton from "../../Components/DownloadAction/CopyButton";
import CSVButton from "../../Components/DownloadAction/CSVButton";
import PDFButton from "../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../Components/DownloadAction/ExcelButton";
import SearchElement from "../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
const History = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef(null);

  // Initialize filteredProducts with the initial data
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

  const title = "View Balance Transfer History";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "View Balance Transfer History", href: "" },
  ];

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
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} />
      <div className="p-4 sm:ml-64 bg-gray-200 mb-20">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CopyButton data={products} />
              <ExcelButton data={products} filename={"history.xlsx"} />
              <CSVButton data={products} filename={"history.csv"} />
              <PDFButton tableRef={tableRef} filename={"History.pdf"} />
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
    </>
  );
};

export default History;
