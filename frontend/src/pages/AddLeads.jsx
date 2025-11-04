import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { axiosApiInstance, notify } from "../library/helper";

export default function AddLeads() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    leadLinePhone: "",
    pinCode: "",
    state: "",
    city: "",
    shopName: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔹 Refs for input navigation
  const inputRefs = {
    name: useRef(),
    mobile: useRef(),
    email: useRef(),
    leadLinePhone: useRef(),
    pinCode: useRef(),
    city: useRef(),
    state: useRef(),
    shopName: useRef(),
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Enter key to move to next input
  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextField && inputRefs[nextField]) {
        inputRefs[nextField].current.focus();
      } else {
        e.target.form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!formData.leadLinePhone)
      newErrors.leadLinePhone = "Lead line phone number is required";
    else if (!/^\d{10}$/.test(formData.leadLinePhone))
      newErrors.leadLinePhone = "Enter a valid 10-digit lead line phone number";
    if (!formData.pinCode) newErrors.pinCode = "Pin code is required";
    else if (!/^\d{6}$/.test(formData.pinCode))
      newErrors.pinCode = "Enter a valid 6-digit pin code";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.shopName.trim())
      newErrors.shopName = "Shop name is required";
    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  try {
    setLoading(true);

    const res = await axiosApiInstance.post(
      "/leads/create",
      formData,
      { headers: { "Content-Type": "application/json" } }
    );

    // ✅ Always show backend message
    notify(res.data.msg, res.data.flag);

    if (res.data.flag === 1) {
      setFormData({
        name: "",
        mobile: "",
        email: "",
        leadLinePhone: "",
        pinCode: "",
        state: "",
        city: "",
        shopName: "",
      });
      setErrors({});
    }
  } catch (err) {
    console.error(err);

    // ✅ Show backend error message if available
    if (err.response && err.response.data && err.response.data.msg) {
      notify(err.response.data.msg, 0);
    } else {
      notify("Something went wrong. Please try again.", 0);
    }
  } finally {
    setLoading(false);
  }
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              ref={inputRefs.name}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "mobile")}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
            <input
              ref={inputRefs.mobile}
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "email")}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              ref={inputRefs.email}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "leadLinePhone")}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Lead Line Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Lead Line Phone</label>
            <input
              ref={inputRefs.leadLinePhone}
              type="tel"
              name="leadLinePhone"
              value={formData.leadLinePhone}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "pinCode")}
              placeholder="Enter lead line phone number"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.leadLinePhone && <p className="text-red-500 text-sm mt-1">{errors.leadLinePhone}</p>}
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pin Code</label>
            <input
              ref={inputRefs.pinCode}
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "city")}
              placeholder="Enter pin code"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
            <input
              ref={inputRefs.city}
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "state")}
              placeholder="Enter city"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
            <input
              ref={inputRefs.state}
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "shopName")}
              placeholder="Enter state"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          {/* Shop Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Shop Name</label>
            <input
              ref={inputRefs.shopName}
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, null)}
              placeholder="Enter shop name"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.shopName && <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}
