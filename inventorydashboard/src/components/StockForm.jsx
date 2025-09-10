import React, { useState, useEffect } from "react";

function StockForm({ item, onSave, onCancel }) {
  const [restockQuantity, setRestockQuantity] = useState(0);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setRestockQuantity(0);
    setConfirming(false);
  }, [item]);

  if (!item) return null;

  const totalCost = restockQuantity * item.pricePerUnit;

  const handleConfirm = async () => {
    try {
      const response = await fetch('http://localhost:5231/inventory/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materialId: item.material_id,
          quantity: restockQuantity,
          action: 'restock',
        }),
      });
   
      const result = await response.json();
   
      if (response.ok) {
        const updatedItem = {
          ...item,
          quantityAvailable: result.newQuantity,
        };
        onSave(updatedItem);
      } else {
        alert(result.message || 'Restock failed');
      }
    } catch (error) {
      console.error('Restock error:', error);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl mb-4 text-[#281e5d]">Restock Material</h2>

        <p className="mb-2 text-sm text-gray-700">
          <strong>Material:</strong> {item.itemName}
        </p>
        <p className="mb-2 text-sm text-gray-700">
          <strong>Current Quantity:</strong> {item.quantityAvailable}
        </p>
        <p className="mb-2 text-sm text-gray-700">
          <strong>Price per Unit:</strong> ₹{item.pricePerUnit}
        </p>

        <label className="block mb-1 text-sm">Restock Quantity</label>
        <input
          type="number"
          min="1"
          max="500"
          value={restockQuantity}
          onChange={(e) => setRestockQuantity(Number(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {restockQuantity > 0 && !confirming && (
          <div className="text-sm text-gray-800 mb-4">
            Restocking will cost <strong>₹{totalCost}</strong>. This amount will be deducted from the zone's allocated budget.
            <br />
            Are you sure you want to proceed?
          </div>
        )}

        <div className="flex justify-between mt-4">
          {!confirming ? (
            <>
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setConfirming(true)}
                disabled={restockQuantity <= 0}
              >
                Confirm Restock
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={onCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleConfirm}
              >
                Yes, Restock
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={onCancel}
              >
                No, Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StockForm;

