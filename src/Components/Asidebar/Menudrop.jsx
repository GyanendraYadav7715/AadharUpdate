import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ title, items, iconClass }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <li>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center justify-between w-full p-2   text-black transition duration-75 rounded-lg group hover:bg-gray-200 text-lg    "
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
      >
        <i className={iconClass}></i>
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {title}
        </span>
        <i
          className={
            dropdownOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
          }
        ></i>
      </button>
      <ul
        id="dropdown-example"
        className={`${
          dropdownOpen ? "block" : "hidden"
        } py-2 space-y-2 px-1 transition-all duration-30`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.link}
              className="flex items-center w-full py-2 px-8  text-black transition duration-75 rounded-lg    hover:bg-gray-200 no-underline"
              download="Form.pdf"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Menudrop = () => {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.User_type;
  }
  if (role === "Superadmin")
    return (
      <>
        <Dropdown
          title="User Management"
          items={[
            { label: "Add Admin User", link: "/adduser" },
            { label: "View User List", link: "/viewuser" },
            { label: "View Retailer User List", link: "/viewretaileruserlist" },
          ]}
          iconClass="ri-command-fill w-5 h-5 text-black transition duration-75   group-hover:text-gray-900  "
        />
        <Dropdown
          title="Entry Management"
          items={[
            { label: "New Entry", link: "/add-customer" },
            { label: "View Entry", link: "/list" },
            {
              label: "Update Form",
              link: "https://ultra.getviewandupdate.in/update.pdf",
            },
            { label: "Search Entry Data", link: "/searchentrydata" },
          ]}
          iconClass="ri-add-fill w-5 h-5 text-black transition duration-75   group-hover:text-gray-900  "
        />
        <Dropdown
          title="Child Management"
          items={[
            { label: "Enroll Child", link: "/new-entry" },
            { label: "View Child Data", link: "/ViewChildData" },
            { label: "View Child Entry", link: "/child-entry-list" },
            {
              label: "Enrollment Form",
              link: "https://ultra.getviewandupdate.in/update.pdf",
            },
          ]}
          iconClass="ri-open-arm-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
        />
        <Dropdown
          title="Mobile Management"
          items={[
            { label: "Mobile Update", link: "/mobileupdate" },
            { label: "Mobile Data", link: "/mobiledata" },
            { label: "Admin Report", link: "/adminreport" },
          ]}
          iconClass="ri-smartphone-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
        />
        <Dropdown
          title="Download Drivers"
          items={[
            {
              label: "Mantra Driver V9.2.0.0",
              link: "https://download.radiumbox.com/download/MFS100Driver_9.2.0.0.exe",
            },
            { label: "Mantra Client Service V9.0.3.8", link: "#" },
            { label: "Mantra RD Service V1.0.4", link: "#" },
          ]}
          iconClass="ri-download-cloud-2-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
        />
      </>
    );
  else if (role === "BackOffice")
    return (
      <>
        <Dropdown
          title="Demographic"
          items={[{ label: "View Entry", link: "/list" }]}
          iconClass="ri-add-fill w-5 h-5 text-black transition duration-75   group-hover:text-gray-900  "
        />
        <Dropdown
          title="Child Management"
          items={[{ label: "View Child Data", link: "/ViewChildData" }]}
          iconClass="ri-open-arm-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
        />
        <Dropdown
          title="Mobile Management"
          items={[{ label: "Admin Report", link: "/adminreport" }]}
          iconClass="ri-smartphone-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
        />
        <Dropdown
          title="Download Drivers"
          items={[
            {
              label: "Mantra Driver V9.2.0.0",
              link: "https://download.radiumbox.com/download/MFS100Driver_9.2.0.0.exe",
            },
            { label: "Mantra Client Service V9.0.3.8", link: "#" },
            { label: "Mantra RD Service V1.0.4", link: "#" },
          ]}
          iconClass="ri-download-cloud-2-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
        />
      </>
    );
  return (
    <>
      <Dropdown
        title="Demographic"
        items={[
          { label: "New Entry", link: "/add-customer" },
          { label: "View Entry", link: "/list" },
          {
            label: "Update Form",
            link: "https://ultra.getviewandupdate.in/update.pdf",
          },
        ]}
        iconClass="ri-add-fill w-5 h-5 text-black transition duration-75   group-hover:text-gray-900  "
      />
      <Dropdown
        title="Child Management"
        items={[
          { label: "Enroll Child", link: "/new-entry" },

          { label: "View Child Entry", link: "/child-entry-list" },
          {
            label: "Enrollment Form",
            link: "https://ultra.getviewandupdate.in/update.pdf",
          },
        ]}
        iconClass="ri-open-arm-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
      />
      <Dropdown
        title="Mobile Management"
        items={[
          { label: "Mobile Update", link: "/mobileupdate" },
          { label: "Mobile Data", link: "/mobiledata" },
          {
            label: "Enrollment Form",
            link: "https://ultra.getviewandupdate.in/update.pdf",
          },
        ]}
        iconClass="ri-smartphone-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
      />
      <Dropdown
        title="Download Drivers"
        items={[
          {
            label: "Mantra Driver V9.2.0.0",
            link: "https://download.radiumbox.com/download/MFS100Driver_9.2.0.0.exe",
          },
          { label: "Mantra Client Service V9.0.3.8", link: "#" },
          { label: "Mantra RD Service V1.0.4", link: "#" },
        ]}
        iconClass="ri-download-cloud-2-fill w-5 h-5  text-black transition duration-75   group-hover:text-gray-900  "
      />
    </>
  );
};

export default Menudrop;
