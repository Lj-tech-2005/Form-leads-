import React, { useEffect, useState } from "react";
import LeadsHeader from "../components/LeadsHeader";
import { axiosApiInstance, notify } from "../library/helper";
import Swal from "sweetalert2";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ Fetch Leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axiosApiInstance.get("/leads/read");
        console.log("Leads API Response:", res.data);

        if (Array.isArray(res.data)) {
          setLeads(res.data);
        } else if (Array.isArray(res.data.leads)) {
          setLeads(res.data.leads);
        } else if (Array.isArray(res.data.data)) {
          setLeads(res.data.data);
        } else {
          setLeads([]);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        notify("Failed to fetch leads", 0);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // ✅ Toggle Status
  const handleStatus = async (id) => {
    try {
      const res = await axiosApiInstance.patch(`/leads/Status/${id}`);
      notify(res.data.msg, res.data.flag);

      if (res.data.flag === 1) {
        setLeads((prev) =>
          prev.map((lead) =>
            lead._id === id ? { ...lead, status: !lead.status } : lead
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      notify("Something went wrong", 0);
    }
  };

  // ✅ Delete Lead
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lead will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosApiInstance.delete(`/leads/delete/${id}`);
          notify(res.data.msg, res.data.flag);

          if (res.data.flag === 1) {
            setLeads((prev) => prev.filter((lead) => lead._id !== id));
          }
        } catch (error) {
          console.error("Error deleting lead:", error);
          notify("Something went wrong", 0);
        }
      }
    });
  };

  // ✅ Filter and Search
  const filteredLeads = Array.isArray(leads)
    ? leads.filter((lead) => {
        const matchStatus =
          statusFilter === "all"
            ? true
            : statusFilter === "active"
            ? lead.status
            : !lead.status;

        const matchSearch =
          lead.name?.toLowerCase().includes(search.toLowerCase()) ||
          lead.email?.toLowerCase().includes(search.toLowerCase()) ||
          lead.mobile?.includes(search) ||
          lead.shopName?.toLowerCase().includes(search.toLowerCase());

        return matchStatus && matchSearch;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-0">
      <LeadsHeader />

      {/* Filter and Search */}
      <div className="bg-white shadow-md rounded-lg p-3 mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name, email, mobile, shop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm w-full sm:w-72"
          />
        </div>
      </div>

      {/* Leads List */}
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredLeads.length === 0 ? (
          <p className="text-center text-gray-500">No leads found</p>
        ) : (
          <>
            {/* ✅ Desktop Table View */}
            <div className="hidden lg:block bg-white shadow-lg rounded-lg p-2 sm:p-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Leads Table</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm sm:text-base">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Email</th>
                      <th className="border p-2">Mobile</th>
                      <th className="border p-2">Lead Line Phone</th>
                      <th className="border p-2">Shop Name</th>
                      <th className="border p-2">City</th>
                      <th className="border p-2">State</th>
                      <th className="border p-2">Pin Code</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead._id} className="text-center">
                        <td className="border p-2">{lead.name}</td>
                        <td className="border p-2">{lead.email}</td>
                        <td className="border p-2">{lead.mobile}</td>
                        <td className="border p-2">{lead.leadLinePhone}</td>
                        <td className="border p-2">{lead.shopName}</td>
                        <td className="border p-2">{lead.city}</td>
                        <td className="border p-2">{lead.state}</td>
                        <td className="border p-2">{lead.pinCode}</td>
                        <td className="border p-2">
                          <span
                            onClick={() => handleStatus(lead._id)}
                            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                              lead.status
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {lead.status ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="border p-2">
                          <button
                            onClick={() => handleDelete(lead._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ✅ Mobile Card View */}
            <div className="block lg:hidden space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="bg-white shadow-lg rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between"><span className="font-semibold">Name:</span><span>{lead.name}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Email:</span><span>{lead.email}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Mobile:</span><span>{lead.mobile}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Lead Line Phone:</span><span>{lead.leadLinePhone}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Shop Name:</span><span>{lead.shopName}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">City:</span><span>{lead.city}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">State:</span><span>{lead.state}</span></div>
                  <div className="flex justify-between"><span className="font-semibold">Pin Code:</span><span>{lead.pinCode}</span></div>

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Status:</span>
                    <span
                      onClick={() => handleStatus(lead._id)}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                        lead.status
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {lead.status ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
