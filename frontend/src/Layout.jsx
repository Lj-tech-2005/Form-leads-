import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { FaBars } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <ToastContainer autoClose={1200} />
      <div
        className={`fixed top-0 left-0 z-50 w-50 h-full bg-white shadow-lg transform transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 cursor-pointer lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="hidden lg:flex">
        <Sidebar />
      </div>


      <div className="flex-1 flex flex-col">
     
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">LeadCRM</h1>
        </div>

        <main className=" bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
