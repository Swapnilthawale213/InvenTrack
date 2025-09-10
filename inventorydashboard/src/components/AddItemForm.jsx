import axios from "axios";
import React from "react";

export default function AddItemForm({ onClose, onAdd, zoneId, nextId }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#281e5d]">Add New Item</h2>
        <form
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.target;

    const newItem = {
      name: form.name.value,
      minquantity: parseInt(form.min_quantity.value),
      currentquantity: parseInt(form.current_quantity.value),
      unitcost: parseFloat(form.unit_cost.value),
      zoneId: zoneId,
    };

    try {
      const response = await axios.post("http://localhost:5231/additem/add", newItem);
      console.log("Success:", response.data);
      onAdd(newItem); // Optional: update local state/UI
    } catch (error) {
      console.error("Error adding new item:", error);
    }

    onClose();
  }}
>
          <input name="name" placeholder="Name" required className="w-full mb-2 p-2 border rounded" />
          <input name="min_quantity" type="number" placeholder="Min Quantity" required className="w-full mb-2 p-2 border rounded" />
          <input name="current_quantity" type="number" placeholder="Current Quantity" required className="w-full mb-2 p-2 border rounded" />
          <input name="unit_cost" type="number" step="0.01" placeholder="Unit Cost" required className="w-full mb-4 p-2 border rounded" />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#281e5d] text-white rounded"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
