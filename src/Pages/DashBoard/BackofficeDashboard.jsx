import React from "react";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
const title = "Dashboard";
const links = [
  { title: "Home", href: "/backoffice" },
  { title: "Dashboard", href: "/backoffice" },
  { title: "Back Office" },
];

function Dashboard() {
  const backgroundColors = [
    "bg-gradient-to-r from-blue-500 to-purple-500",
    "bg-gradient-to-r from-green-500 to-yellow-500",
  ]; // Customizable color palette

  return (
    <>
      <Breadcrumb title={title} links={links} />
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold">
            Welcome To Main Admin Panel - Back Office
          </h1>
        </header>
        <main className="flex-grow overflow-auto p-4 relative">
          {/* Moving and mixing background animation */}
          <div
            className={`absolute top-0 left-0 w-full h-full overflow-hidden ${backgroundColors[0]} animation-[backgroundAnimation] duration-20s ease-in-out infinite`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-full overflow-hidden ${backgroundColors[1]} animate-[backgroundAnimation] duration-30s ease-in-out infinite delay-10s`}
            ></div>
          </div>

          {/* Add your dashboard content here */}
        </main>
      </div>
    </>
  );
}

// Custom animation keyframes (adjust timing for desired movement)
const backgroundAnimation = {
  "0%": { transform: "translate(-50%, 0)" },
  "50%": { transform: "translate(50%, 0)" },
  "100%": { transform: "translate(-50%, 0)" },
};

export default Dashboard;
