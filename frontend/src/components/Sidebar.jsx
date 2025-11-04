import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaChartLine,
  FaBox,
  FaBell,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-50 h-screen bg-white border-r flex flex-col p-4">
      <h1 className="text-lg font-bold mb-6">Shop Detail ALL Rajasthan</h1>
      <hr className="mb-4" />

      <div className="flex flex-col space-y-2">
        <Link
          to="/"
          className={`flex items-center space-x-3 p-2 rounded-md text-sm font-medium cursor-pointer transition
            ${
              isActive("/")
                ? "bg-gray-100 text-black"
                : "text-gray-700 hover:bg-gray-50 active:bg-gray-200"
            }`}
        >
          <FaTachometerAlt className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/leads"
          className={`flex items-center space-x-3 p-2 rounded-md text-sm font-medium cursor-pointer transition
            ${
              isActive("/leads")
                ? "bg-gray-100 text-black"
                : "text-gray-700 hover:bg-gray-50 active:bg-gray-200"
            }`}
        >
          <FaUsers className="w-5 h-5" />
          <span>SHOP LIST</span>
        </Link>

    
      </div>
    </div>
  );
}
