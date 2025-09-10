import React, { useState } from "react";

export default function AddNewZone({ onSave, onCancel }) {
  const [zoneData, setZoneData] = useState({
    zoneName: "",
    description: "",
    budget: "",
    user: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["username", "email", "password"].includes(name)) {
      setZoneData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    } else {
      setZoneData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...zoneData, zoneId: Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-[#281e5d]">Add New Zone</h2>

        <input
          type="text"
          name="zoneName"
          placeholder="Zone Name"
          value={zoneData.zoneName}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Zone Description"
          value={zoneData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Zone Budget"
          value={zoneData.budget}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <h3 className="text-lg font-semibold mt-4 mb-2 text-[#281e5d]">User Details</h3>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={zoneData.user.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={zoneData.user.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={zoneData.user.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#281e5d] text-white rounded hover:bg-[#3a2f7d]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
