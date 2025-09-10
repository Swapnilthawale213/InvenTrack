import React, { useState } from "react";

export default function DeleteForm({ item, onCancel, onConfirm }) {
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }
    if (qty > item.quantityAvailable) {
      alert("Cannot dispatch more than available quantity.");
      return;
    }
    onConfirm(qty);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Dispatch Items</h2>
        <p className="mb-2">Item: <strong>{item.itemName}</strong></p>
        <p className="mb-2">Available Quantity: {item.quantityAvailable}</p>
        <input
          type="number"
          min="1"
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter quantity to dispatch"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
