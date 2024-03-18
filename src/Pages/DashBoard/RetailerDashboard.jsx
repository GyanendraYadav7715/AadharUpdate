import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import Banner from "../../Components/Banner";
import axios from "axios";
import { Local_Url } from "../../constant/constant";

const Dashboard = () => {
  const userData = localStorage.getItem("user");
  const [userName, setUserName] = useState("");
  const [statistics, setStatistics] = useState({
    balance: 0,
    totalApplication: 0,
    totalApplicationCompleted: 0,
    totalApplicationRejected: 0,
    totalChildApplication: 0,
    totalChildApplicationCompleted: 0,
    totalChildApplicationRejected: 0,
    totalMobileApplication: 0,
    totalMobileApplicationCompleted: 0,
    totalMobileApplicationRejected: 0,
  });

  useEffect(() => {
    if (userData) {
      const userObj = JSON.parse(userData);
      setUserName(userObj.Username);
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = { userName };
        const response = await axios.get(
          `${Local_Url}/api/v1/retailer/allDRetailerData`,
          { params: queryParams }
        );
        setStatistics({
          balance: response.data.Balance,
          totalApplication: response.data.dtotalApplication,
          totalApplicationCompleted: response.data.dcompleted,
          totalApplicationRejected: response.data.drejectApl,
          totalChildApplication: response.data.ctotalApplication,
          totalChildApplicationCompleted: response.data.ccompleted,
          totalChildApplicationRejected: response.data.crejectApl,
          totalMobileApplication: response.data.mtotalApplication,
          totalMobileApplicationCompleted: response.data.mcompleted,
          totalMobileApplicationRejected: response.data.mrejectApl,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [userName]);

  const title = "Dashboard";
  const links = [
    { title: "Home", href: "/retailer" },
    { title: "Dashboard", href: "/retailer" },
    { title: "Retailer" },
  ];
    const mylinks = [
      {
        to: "/mobileupdate",
        text: " Mobile Entry",
        icon: "ri-add-line text-white text-2xl ",
      },
      {
        to: "/add-customer",
        text: " Demographic Enry",
        icon: "ri-add-line text-white text-2xl ",
      },
      {
        to: "/new-entry",
        text: " Child entry",
        icon: "ri-add-line text-white text-2xl ",
      },
    ];

  const renderStatistics = (title, value, color) => (
    <div
      className={`flex flex-col items-center justify-center rounded bg-${color}-500 h-32 p-4`}
    >
      <h4 className="text-white">{value}</h4>
      <p className="text-lg text-white">{title}</p>
    </div>
  );

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      <div className="p-4 sm:ml-64 ">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b border-black pb-4">
              Demographic System Management
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {renderStatistics("Main Wallet", statistics.balance, "blue")}
              {renderStatistics(
                "Total Applications",
                statistics.totalApplication,
                "yellow"
              )}
              {renderStatistics(
                "Total Completed",
                statistics.totalApplicationCompleted,
                "green"
              )}
              {renderStatistics(
                "Total Rejected",
                statistics.totalApplicationRejected,
                 "red"
              )}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b border-black pb-4">
              Child System Management
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {renderStatistics(
                "Total Child Applications",
                statistics.totalChildApplication,
                "yellow"
              )}
              {renderStatistics(
                "Total Child Completed",
                statistics.totalChildApplicationCompleted,
                "green"
              )}
              {renderStatistics(
                "Total Child Rejected",
                statistics.totalChildApplicationRejected,
                "red"
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-black pb-4">
              Mobile System Management
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {renderStatistics(
                "Total Mobile Applications",
                statistics.totalMobileApplication,
                "yellow"
              )}
              {renderStatistics(
                "Total Mobile Completed",
                statistics.totalMobileApplicationCompleted,
                "green"
              )}
              {renderStatistics(
                "Total Mobile Rejected",
                statistics.totalMobileApplicationRejected,
                "red"
              )}
            </div>
          </div>
        </div>
        <Banner />
      </div>
    </>
  );
};

export default Dashboard;
