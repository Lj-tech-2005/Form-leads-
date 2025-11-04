import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function LeadsHeader() {
  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-4">

      <div>
        <h2 className="text-xl font-bold text-gray-900">Shops</h2>
        <p className="text-sm text-gray-500">Manage and track your shop list</p>
      </div>
      <Link
        to="/addleads"
      >
        <button className="flex items-center cursor-pointer gap-2 rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition">
          <FaPlus className="text-sm" />
          Add NEW
        </button>

      </Link>
    </div>
  );
}
