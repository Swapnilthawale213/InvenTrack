import React from "react";
import { FaBook } from "react-icons/fa";

export default function ZoneCard({ zone, onBudgetUpdate }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center border-t-4 border-[#a3b8e0]">
      <div className="flex justify-center items-center mb-4">
        <div className="bg-[#e6ecf8] text-[#1e3a8a] rounded-full p-3">
          <FaBook className="text-xl" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{zone.zoneName}</h3>
      <p className="text-gray-600 text-sm mb-1">Total Items: {zone.totalItems}</p>
      <p className="text-gray-600 text-sm mb-1">Total Quantity: {zone.totalQuantity}</p>
      <p className="text-gray-600 text-sm mb-1">Budget Allocated: ₹{zone.budgetAllocated}</p>
      <p className="text-gray-600 text-sm mb-1">Budget Used: ₹{zone.budgetUsed}</p>
      <p className="text-gray-600 text-sm mb-1">Dispatch Count: {zone.dispatchCount}</p>
      <p className="text-gray-700 text-sm mb-4">{zone.description}</p>
      <button
        onClick={onBudgetUpdate}
        className="bg-[#1e3a8a] text-white px-4 py-2 rounded hover:bg-[#2c4ea3] text-sm font-semibold"
      >
        Update Budget
      </button>
    </div>
  );
}
