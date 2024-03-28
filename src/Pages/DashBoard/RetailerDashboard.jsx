import React,{useState,useEffect} from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import Banner from "../../Components/Banner/Banner";
import axios from "axios";
import { Local_Url } from "../../constant/constant";

const RetailerDashboard = () => {
  const userData = localStorage.getItem("user");
  const [userName, setUserName] = useState("");
  const [statistics, setStatistics] = useState({
    balance: 0,
    totalApplication: 0,
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
    if (userData) {
      const userObj = JSON.parse(userData);
      const username = userObj.Username;
      setUserName(username);
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userName) {
          const response = await axios.get(
            `${Local_Url}/api/v1/retailer/allDRetailerData`,
            { params: { userName } }
          );

          setStatistics({
            balance: response.data.data.Balance || 0,
            totalApplication: response.data.data.dtotalApplication || 0,
            totalApplicationProgress: response.data.data.dinProgress || 0,
            totalApplicationCompleted: response.data.data.dcompleted || 0,
            totalApplicationRejected: response.data.data.drejectApl || 0,
            totalChildApplication: response.data.data.ctotalApplication || 0,
            totalChildApplicationCompleted: response.data.data.ccompleted || 0,
            totalChildApplicationProgress: response.data.data.cinProgress || 0,
            totalChildApplicationRejected: response.data.data.crejectApl || 0,
            totalMobileApplication: response.data.data.mtotalApplication || 0,
            totalMobileApplicationCompleted: response.data.data.mcompleted || 0,
            totalMobileApplicationRejected: response.data.data.mrejectApl || 0,
            totalMobileApplicationProgress: response.data.data.minProgress || 0,
          });
        }
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
      text: " Demographic Entry",
      icon: "ri-add-line text-white text-2xl ",
    },
    {
      to: "/new-entry",
      text: " Child Entry",
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
                Balance
            </h2>
            <div className="grid grid-cols-1 gap-4 pb-4">
              {renderStatistics("Main Balance", statistics.balance, "blue")}
            </div>

            <div className="grid grid-cols-2 gap-4 sr-only">
              {renderStatistics(
                "Child Balance",
                0,
                "green"
              )}
              {renderStatistics(
                "Mobile Balance",
                0,
                "green"
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
          <div className="mb-8 bg-">
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
        <Banner />
      </div>
    </>
  );
};

export default RetailerDashboard;
