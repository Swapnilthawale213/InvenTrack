import React, { useState } from "react";
import ZoneCard from "../components/ZoneCard";
import ZoneForm from "../components/ZoneForm";
import AdminSidebar from "../components/AdminSidebar";
import { initialZones } from "../data/zonesData";

export default function Zones() {
  const [zones, setZones] = useState(initialZones);
  const [editingZone, setEditingZone] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("edit");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newZoneData, setNewZoneData] = useState({
    Zonename: "",
    Zonedescription: "",
    Zonebudget: "",
    Username: "",
    Email: "",
    Password: "",
  });

  const handleBudgetUpdate = (zone) => {
    setEditingZone(zone);
    setFormMode("budget");
    setShowForm(true);
  };

  const handleSave = (updatedZone) => {
    setZones((prev) =>
      prev.map((zone) =>
        zone.zoneId === updatedZone.zoneId ? updatedZone : zone
      )
    );
    setShowForm(false);
  };

  const handleAddZone = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5231/zoneaddition/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newZoneData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add zone");
      }

      const data = await response.json();
      const newZone = {
        zoneId: data.zoneId,
        zoneName: newZoneData.Zonename,
        description: newZoneData.Zonedescription,
        budget: newZoneData.Zonebudget,
        amountUsed: 0,
        location: "",
        zoneType: "",
      };

      setZones((prev) => [...prev, newZone]);
      setShowAddForm(false);
      setNewZoneData({
        Zonename: "",
        Zonedescription: "",
        Zonebudget: "",
        Username: "",
        Email: "",
        Password: "",
      });
    } catch (error) {
      console.error("Error adding zone:", error);
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewZoneData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <AdminSidebar />
      <div className="p-6 bg-white min-h-screen relative z-10 ml-12">
        <h1 className="text-2xl font-bold mb-4 text-[#281e5d] text-center">
          Zones
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <ZoneCard
              key={zone.zoneId}
              zone={zone}
              onBudgetUpdate={() => handleBudgetUpdate(zone)}
            />
          ))}
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-[#281e5d] text-white rounded hover:bg-[#3a2f7d]"
          >
            + Add New Zone
          </button>
        </div>

        {showForm && (
          <ZoneForm
            zone={editingZone}
            mode={formMode}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleAddZone}
              className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4 text-[#281e5d]">
                Add New Zone
              </h2>

              {["Zonename", "Zonedescription", "Zonebudget", "Username", "Email", "Password"].map((field) => (
                <input
                  key={field}
                  type={field === "Password" ? "password" : field === "Email" ? "email" : "text"}
                  name={field}
                  placeholder={field}
                  value={newZoneData[field]}
                  onChange={handleInputChange}
                  required
                  className="w-full mb-2 p-2 border rounded"
                />
              ))}

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#281e5d] text-white rounded hover:bg-[#3a2f7d]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
