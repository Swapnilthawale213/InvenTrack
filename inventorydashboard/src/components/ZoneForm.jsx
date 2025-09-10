import React, { useState } from "react";
import axios from "axios";

export default function ZoneForm({ zone, mode = "edit", onSave, onCancel }) {
  const [budgetChange, setBudgetChange] = useState(0);
  const [changeType, setChangeType] = useState("add");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "budget") {
      const dto = {
        zoneId: zone.zoneId,
        amount: budgetChange,
        action: changeType,
      };

      try {
        const response = await axios.post(
          "http://localhost:5231/UpdateZoneBudget/zone/update-budget",
          dto,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const updatedZone = {
          ...zone,
          budgetAllocated: response.data.newBudget,
        };

        onSave(updatedZone);
      } catch (error) {
        console.error("Failed to update zone budget:", error);
        alert("Error updating budget. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">
          {mode === "budget" ? `Update Budget for ${zone.zoneName}` : "Edit Zone"}
        </h2>

        {mode === "budget" && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount (₹)</label>
              <input
                type="number"
                value={budgetChange}
                onChange={(e) => setBudgetChange(Number(e.target.value))}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Action</label>
              <select
                value={changeType}
                onChange={(e) => setChangeType(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="add">Increase Budget</option>
                <option value="subtract">Reduce Budget</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="bg-[#281e5d] text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-600 hover:underline px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
