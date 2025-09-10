import React from "react";
import { FaBoxOpen } from "react-icons/fa";

export default function StockCard({ item, onRestock, onDispatch }) {
  const totalCost = item.unit_cost * item.current_quantity;
  const minRequired = item.min_quantity;

  const getStockTag = () => {
    if (item.current_quantity < item.min_quantity - (item.min_quantity * 0.10)) {
      return (
        <span className="absolute top-2 left-2 text-xs bg-gradient-to-r from-red-400 to-red-600 text-white px-2 py-1 rounded shadow">
          Needs Restocking
        </span>
      );
    } else if (item.current_quantity > item.min_quantity - (item.min_quantity * 0.10) && item.current_quantity < item.min_quantity + (item.min_quantity * 0.10)) {
      return (
        <span className="absolute top-2 left-2 text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded shadow">
          At Minimum
        </span>
      );
    } else {
      return (
        <span className="absolute top-2 left-2 text-xs bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded shadow">
          Sufficient Stock
        </span>
      );
    }
  };

  return (
    <div className="relative border p-4 rounded shadow bg-white font-sans border-[#a3b8e0]">
      {getStockTag()}

      {item.materialimage ? (
        <img
          src={item.materialimage}
          alt={item.name}
          className="w-full h-32 object-fit rounded mb-2"
        />
      ) : (
        <div className="w-full h-32 flex items-center justify-center bg-[#e6ecf8] rounded mb-2">
          <FaBoxOpen className="text-[#1e3a8a] text-4xl" />
        </div>
      )}

      <h3 className="text-lg font-semibold text-[#1e3a8a] flex items-center gap-2">
        {/* <FaBoxOpen className="text-[#3b5ba9]" /> */}
        {item.name}
      </h3>

      {/* <p className="text-sm text-gray-700">Zone ID: {item.zone_id}</p> */}
      <p className="text-sm text-gray-700">Available: {item.current_quantity}</p>
      <p className="text-sm text-gray-700">Min Required: {item.min_quantity}</p>
      <p className="text-sm text-gray-700">Price per Unit: ₹{item.unit_cost}</p>
      
<p className="text-sm text-gray-700">
  Last Restock: {item.last_restock ? item.last_restock : "Not updated yet"}
</p>
<p className="text-sm text-gray-700">
  Last Dispatch: {item.last_dispatch ? item.last_dispatch : "Not updated yet"}
</p>

      <p className="font-bold text-[#1e3a8a]">Total Cost: ₹{totalCost.toFixed(2)}</p>

      <div className="flex justify-between mt-4">
        <button
          className="bg-gradient-to-r from-[#3b5ba9] to-[#1e3a8a] text-white px-3 py-1 rounded hover:from-[#4c6bc0] hover:to-[#2c4ea3]"
          onClick={onRestock}
        >
          Restock
        </button>
        <button
          className="bg-gradient-to-r from-[#5a7bd5] to-[#3b5ba9] text-white px-3 py-1 rounded hover:from-[#6c8be0] hover:to-[#4c6bc0]"
          onClick={onDispatch}
        >
          Dispatch
        </button>
      </div>
    </div>
  );
}
