import React, { useState } from "react";

export default function AddressForm({ setStep, formData, setFormData }) {
  const states = [
    "Andhra Pradesh",
    "Telangana",
    "Tamil Nadu",
    "Karnataka",
    "Maharashtra",
    "Kerala",
    "Delhi",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Gujarat",
    "Punjab",
    "Rajasthan",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.mobile ||
      !formData.email || // Added email to validation
      !formData.pincode ||
      !formData.city ||
      !formData.house ||
      !formData.road
    ) {
      alert("Please fill in all address fields.");
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    // Added email format validation
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
   
    setStep(1);
    console.log("Saved Address:", formData);
  };

  return (
    <div className="bg-[#f1f2f4]  flex flex-col items-center py-8">
      {/* 🔹 Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-4 px-6">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:outline-blue-500"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:outline-blue-500"
        />
        {/* Added Email field */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email || ''} // Ensure it's controlled, default to empty string if undefined
          onChange={handleChange}
          className="w-full border p-3 rounded focus:outline-blue-500"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:outline-blue-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-blue-500"
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-blue-500"
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="house"
          placeholder="House No., Building Name"
          value={formData.house}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:outline-blue-500"
        />
        <input
          type="text"
          name="road"
          placeholder="Road name, Area, Colony"
          value={formData.road}
          onChange={handleChange}
          className="w-full border p-3 rounded focus:outline-blue-500"
        />

        {/* 🔹 Save Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-600 rounded shadow"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
