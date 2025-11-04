import React, { useEffect, useState } from "react";
import { axiosApiInstance } from "../library/helper";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axiosApiInstance.get("/leads/read");
        setLeads(Array.isArray(res.data) ? res.data : res.data.leads || []);

      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const totalLeads = leads.length;
  const activeLeads = leads.filter((l) => l.status).length;
  const inactiveLeads = leads.filter((l) => !l.status).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">SHOP DETAILS Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold">Total Shop</h2>
              <p className="text-2xl font-bold text-blue-600">{totalLeads}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold">Active Shop</h2>
              <p className="text-2xl font-bold text-green-600">{activeLeads}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold">Inactive shop</h2>
              <p className="text-2xl font-bold text-red-600">{inactiveLeads}</p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent shop</h2>
            <ul className="divide-y">
              {leads.slice(0, 5).map((lead) => (
                <li key={lead._id} className="py-2 flex justify-between">
                  <span>{lead.name}</span>
                  <span className={lead.status ? "text-green-600" : "text-red-600"}>
                    {lead.status ? "Active" : "Inactive"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}