import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../constant/constant";
import axios from "axios";

const DashBoard = () => {
  // const [walletBalance, setWalletBalance] = useState(0);
  // const [totalUsers, setTotalUsers] = useState(0);

  // useEffect(() => {
  //   const apiUrl = `${Local_Url}/api/v1/admin/total-customers`;

  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       const totalUsersCount = response.data.totalApplication; // Assuming response.data.data is an array
  //       setTotalUsers(totalUsersCount);
  //     })
  //     .catch((err) => {
  //       console.log("Something Went Wrong:", err);
  //     });
  // }, []);
  const userData = localStorage.getItem("user");
  const [userName, setUserName] = useState("");
  const [statistics, setStatistics] = useState({
    // balance: 0,
    totalUsers: 0,
    // totalApplication: 0,
    // totalApplicationCompleted: 0,
    // totalApplicationRejected: 0,
    // totalChildApplication: 0,
    // totalChildApplicationCompleted: 0,
    // totalChildApplicationRejected: 0,
    // totalMobileApplication: 0,
    // totalMobileApplicationCompleted: 0,
    // totalMobileApplicationRejected: 0,
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
          `${Local_Url}/api/v1/admin/total-customers`,
          { params: queryParams }
        );
        setStatistics({
          // balance: response.data.Balance,
          totalUsers: response.data.totalApplication,
          // totalApplication: response.data.dtotalApplication,
          // totalApplicationCompleted: response.data.dcompleted,
          // totalApplicationRejected: response.data.drejectApl,
          // totalChildApplication: response.data.ctotalApplication,
          // totalChildApplicationCompleted: response.data.ccompleted,
          // totalChildApplicationRejected: response.data.crejectApl,
          // totalMobileApplication: response.data.mtotalApplication,
          // totalMobileApplicationCompleted: response.data.mcompleted,
          // totalMobileApplicationRejected: response.data.mrejectApl,
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [userName]);
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
              Wallet & Users
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {renderStatistics("Main Wallet", statistics.balance, "blue")}
              {renderStatistics(
                "Total Applications",
                statistics.totalUsers,
                "yellow"
              )}
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
      </div>
    </>
  );
};

export default DashBoard;
