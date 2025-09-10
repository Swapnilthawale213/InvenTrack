import React, { useState } from "react";
import { useSession } from "../context/SessionContext";
import StockCard from "../components/StockCard";
import StockForm from "../components/StockForm";
import DeleteForm from "../components/DeleteForm";
import AddItemForm from "../components/AddItemForm";
import { initialItems } from "../data/itemsData";
import { initialZones } from "../data/zonesData";
import Sidebar from "../components/Sidebar";
import { FiBell, FiPlus } from "react-icons/fi";
import useSessionTimeout from "../hooks/useSessionTimeout";

export default function Items() {
  useSessionTimeout();
  const { sessionData } = useSession();
  const role = sessionData?.role;
  const zoneId = sessionData?.zoneId;

  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Get zone data from initialZones using zoneId
  const zoneData = initialZones.find((zone) => zone.zoneId === zoneId);
  const zoneBudgetUsed = zoneData?.budgetUsed || 0;
  const zoneBudgetAllocated = zoneData?.budgetAllocated || 0;

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteRequest = (item) => {
    setDeletingItem(item);
  };

  const confirmDelete = async (dispatchQuantity) => {
    try {
      const response = await fetch('http://localhost:5231/inventory/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materialId: deletingItem.material_id,
          quantity: dispatchQuantity,
          action: 'dispatch',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const newItem = {
          ...deletingItem,
          current_quantity: result.newQuantity,
        };

        setItems(items.map((i) =>
          i.material_id === newItem.material_id ? newItem : i
        ));
        setDeletingItem(null);
      } else {
        alert(result.message || 'Dispatch failed');
      }
    } catch (error) {
      console.error('Dispatch error:', error);
      alert('Error connecting to server');
    }
  };

  const categorizeItem = (item) => {
    if (item.current_quantity < item.min_quantity - item.min_quantity * 0.1) return "Needs Restocking";
    if (
      item.current_quantity > item.min_quantity - item.min_quantity * 0.1 &&
      item.current_quantity < item.min_quantity + item.min_quantity * 0.1
    )
      return "Limited";
    return "Plenty";
  };

  const visibleItems = role === "admin"
    ? items
    : items.filter((item) => item.zone_id === zoneId);

  const filteredItems = visibleItems.filter((item) => {
    const category = categorizeItem(item);
    return selectedCategory === "All" || category === selectedCategory;
  });

  const needsRestockingItems = visibleItems.filter(
    (item) => categorizeItem(item) === "Needs Restocking"
  );

  return (
    <>
      <Sidebar />
      <div className="p-6 bg-white min-h-screen relative z-10 ml-12">
        <h1 className="text-2xl font-bold mb-4 text-[#281e5d]">Raw Materials</h1>

        {/* Zone Budget Overview + Notification */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 rounded shadow">
          <div>
            <p className="text-lg font-semibold text-[#281e5d]">Zone Budget Overview</p>
            <p className="text-sm text-gray-700">Total Budget: ₹{zoneBudgetAllocated}</p>
            <p className="text-sm text-gray-700">Used Budget: ₹{zoneBudgetUsed}</p>
            <p className="text-sm text-gray-700">Remaining Budget: ₹{zoneBudgetAllocated - zoneBudgetUsed}</p>
          </div>
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
            <FiBell className="h-6 w-6 text-[#281e5d]" />
            {needsRestockingItems.length > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded shadow">
            <p className="font-semibold text-[#281e5d] mb-2">Needs Restocking:</p>
            {needsRestockingItems.length === 0 ? (
              <p className="text-sm text-gray-600">All materials are sufficiently stocked.</p>
            ) : (
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {needsRestockingItems.map((item) => (
                  <li key={item.material_id}>
                    {item.name} (Qty: {item.current_quantity})
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Needs Restocking", "Limited", "Plenty"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? "bg-[#281e5d] text-white"
                  : "bg-gray-100 text-[#281e5d]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Item Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-sm">
              No items to show.
            </div>
          ) : (
            filteredItems.map((item) => (
              <StockCard
                key={item.material_id}
                item={item}
                onRestock={() => handleEdit(item)}
                onDispatch={() => handleDeleteRequest(item)}
              />
            ))
          )}
        </div>

        {/* Restock Form */}
        {showForm && editingItem && (
          <StockForm
            item={{
              ...editingItem,
              itemName: editingItem.name,
              quantityAvailable: editingItem.current_quantity,
              pricePerUnit: editingItem.unit_cost,
            }}
            onSave={(updatedItem) => {
              const addedQty = updatedItem.quantityAvailable - editingItem.current_quantity;
              const cost = addedQty * editingItem.unit_cost;

              // Update local item quantity
              const newItem = {
                ...editingItem,
                current_quantity: updatedItem.quantityAvailable,
                last_restock: new Date().toLocaleDateString(),
              };
              setItems(items.map((i) => (i.material_id === newItem.material_id ? newItem : i)));
              setShowForm(false);

              // Note: zoneBudgetUsed is static from initialZones, so this won't persist unless synced with backend
              // You can optionally show a toast or warning if budget exceeded
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Dispatch Form */}
        {deletingItem && (
          <DeleteForm
            item={deletingItem}
            onCancel={() => setDeletingItem(null)}
            onConfirm={confirmDelete}
          />
        )}
        
         {/* Add New Item Form */}
          {showNewItemForm && (
            <AddItemForm
              onClose={() => setShowNewItemForm(false)}
              onAdd={(newItem) => setItems([...items, newItem])}
              zoneId={zoneId}
              nextId={items.length + 1}
            />
          )}


         {/* Floating Add Button with Tooltip */}
          <div
            className="fixed bottom-6 right-6 flex flex-col items-center group"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {showTooltip && (
              <div className="mb-2 px-2 py-1 text-sm bg-gray-800 text-white rounded shadow">
                Add New Item
              </div>
            )}
            <button
              onClick={() => setShowNewItemForm(true)}
              className="bg-[#281e5d] text-white p-3 rounded-full shadow-lg hover:bg-[#3a2f7d] transition flex items-center justify-center"
            >
              <FiPlus className="h-5 w-5" />
            </button>
          </div>
      </div>
    </>
  );
}
