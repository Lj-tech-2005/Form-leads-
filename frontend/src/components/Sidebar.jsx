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
    <div className="w-64 h-screen bg-white border-r flex flex-col p-4">
      <h1 className="text-lg font-bold mb-6">LeadCRM</h1>
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
          <span>Leads</span>
        </Link>

        <div className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed">
          <FaCalendarCheck className="w-5 h-5" />
          <span>Follow-Ups</span>
        </div>

        <div className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed">
          <FaChartLine className="w-5 h-5" />
          <span>Sales Activity</span>
        </div>

        <div className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed">
          <FaBox className="w-5 h-5" />
          <span>Products</span>
        </div>

        <div className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed">
          <FaBell className="w-5 h-5" />
          <span>Notifications</span>
        </div>

        <div className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed">
          <FaCog className="w-5 h-5" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
