import { useNavigate } from "react-router-dom";
import Menudrop from "./Menudrop";
import MenuItems from "./MenuItems";
import "remixicon/fonts/remixicon.css";
import "./Asidebar.css";

const Asidebar = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    
    localStorage.clear();
    navigate("/");
  
  };

  return (
    <>
      <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full  mt-14 sm:translate-x-0 shadow-md"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 shadow-2xl" id="tomakescrolldisable">
          <MenuItems />

          <ul className="px-2 py-2 mt-4 space-y-2 font-medium border-t border-gray-400">
            <Menudrop />
          </ul>

          <ul className="px-2 mt-4 space-y-2 font-medium border-t border-gray-400 py-2">
            <li className="hover:bg-gray-200 rounded-lg">
              <button
                onClick={handlelogout}
                className="flex items-center p-2 text-black   no-underline"
              >
                <i className="ri-shut-down-fill w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"></i>
                <span className="ms-3">Log-Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Asidebar;
