import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AddLeads() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    field: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.field) newErrors.field = "Select an interested field";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Lead</h2>
          <Link
            to="/leads"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition duration-300 cursor-pointer"
          >
            ← Back
          </Link>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Mobile
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Interested Field
            </label>
            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            >
              <option value="">Select field</option>
              <option value="web-development">Web Development</option>
              <option value="frontend-developer">Frontend Developer</option>
              <option value="ui-ux">UI/UX</option>
            </select>
            {errors.field && (
              <p className="text-red-500 text-sm mt-1">{errors.field}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-green-500 transition duration-300 cursor-pointer"
          >
            Submit Lead
          </button>
        </form>
      </div>
    </div>
  );
}
