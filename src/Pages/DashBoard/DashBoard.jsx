import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../constant/constant";
import axios from "axios";

const DashBoard = () => {
  const [statistics, setStatistics] = useState({
    balance: 0,
    totalUsers: 0,
    totalApplication: 0,
    totalApplicationProgress: 0,
    totalApplicationCompleted: 0,
    totalApplicationRejected: 0,
    totalChildApplication: 0,
    totalChildApplicationProgress: 0,
    totalChildApplicationCompleted: 0,
    totalChildApplicationRejected: 0,
    totalMobileApplication: 0,
    totalMobileApplicationProgress: 0,
    totalMobileApplicationCompleted: 0,
    totalMobileApplicationRejected: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const userObj = JSON.parse(userData);
      const queryParams = { userName: userObj.Username };
      const response = await axios.get(
        `${Local_Url}/api/v1/admin/adminDashboard`,
        { params: queryParams }
      );
      const responseData = response.data.data;
      setStatistics({
        balance: responseData.Balance || 0,
        totalUsers: responseData.totalApplication || 0,
        totalApplication: responseData.dtotalApplication || 0,
        totalApplicationCompleted: responseData.dcompleted || 0,
        totalApplicationRejected: responseData.drejectApl || 0,
        totalApplicationProgress: responseData.dinProgress || 0,
        totalChildApplication: responseData.ctotalApplication || 0,
        totalChildApplicationCompleted: responseData.ccompleted || 0,
        totalChildApplicationRejected: responseData.crejectApl || 0,
        totalChildApplicationProgress: responseData.cinProgress || 0,
        totalMobileApplication: responseData.mtotalApplication || 0,
        totalMobileApplicationCompleted: responseData.mcompleted || 0,
        totalMobileApplicationRejected: responseData.mrejectApl || 0,
        totalMobileApplicationProgress: responseData.minProgress || 0,
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const renderStatistics = (title, value, color) => (
    <div
      className={`flex flex-col items-center justify-center rounded bg-${color}-500 h-32 p-4`}
    >
      <h4 className="text-white">{value}</h4>
      <p className="text-lg text-white">{title}</p>
    </div>
  );

  const title = "Dashboard";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "Dashboard", href: "/superadmin" },
    { title: "Admin" },
  ];
  const mylinks = [
    {
      to: "/adduser",
      text: "Create New User",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64  ">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b border-black pb-4">
              Wallet & Users
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {renderStatistics("Main Wallet", statistics.balance, "blue")}
              {renderStatistics("Total Users", statistics.totalUsers, "blue")}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b border-black pb-4">
              Demographic System Management
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {renderStatistics(
                "Total Applications",
                statistics.totalApplication,
                "pink"
              )}
              {renderStatistics(
                "Total Completed",
                statistics.totalApplicationCompleted,
                "green"
              )}
              {renderStatistics(
                "Total Inprogress",
                statistics.totalApplicationProgress,
                "blue"
              )}
              {renderStatistics(
                "Total Rejected",
                statistics.totalApplicationRejected,
                "pink"
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
                "pink"
              )}
              {renderStatistics(
                "Total Child Completed",
                statistics.totalChildApplicationCompleted,
                "green"
              )}
              {renderStatistics(
                "Total Child Inprogress",
                statistics.totalChildApplicationProgress,
                "blue"
              )}
              {renderStatistics(
                "Total Child Rejected",
                statistics.totalChildApplicationRejected,
                "pink"
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
                "pink"
              )}
              {renderStatistics(
                "Total Mobile Completed",
                statistics.totalMobileApplicationCompleted,
                "green"
              )}

              {renderStatistics(
                "Total Mobile Inprogress",
                statistics.totalMobileApplicationProgress,
                "blue"
              )}
              {renderStatistics(
                "Total Mobile Rejected",
                statistics.totalMobileApplicationRejected,
                "pink"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
