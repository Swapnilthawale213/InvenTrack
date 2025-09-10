import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialItems } from "../data/itemsData";
import { useSession } from "../context/SessionContext";
import Sidebar from "../components/Sidebar";
import UserProfileCard from "../components/UserProfileCard";
import useSessionTimeout from "../hooks/useSessionTimeout";
import { initialZones } from "../data/zonesData";

export default function Dashboard() {
  useSessionTimeout();
  const { sessionData } = useSession();
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);
  const [zones] = useState(initialZones); // Corrected useState usage

  useEffect(() => {
    const storedSession = sessionStorage.getItem("sessionData");
    if (!storedSession) {
      navigate('/');
    }
    setCheckingSession(false);

    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }, [navigate]);

  if (checkingSession) return null;

  const { user } = sessionData || {};
  const { role, zoneId, name, email, assignedZones } = user || {};

  // Map assigned zone IDs to zone names using zoneId and zoneName
  const assignedZoneNames = assignedZones
    .map(id => {
      const zone = zones.find(z => z.zoneId === id);
      return zone ? zone.zoneName : null;
    })
    .filter(Boolean);

  const currentUser = {
    name: name || "User",
    email: email || "user@example.com",
    role: role || "user",
    assignedZones: assignedZoneNames,
  };

  const visibleItems =
    role === "admin"
      ? initialItems
      : initialItems.filter(item => item.zone_id === zoneId);

  const totalQuantity = visibleItems.reduce(
    (sum, item) => sum + item.current_quantity,
    0
  );

  const categorizeItem = (item) => {
    if (item.current_quantity < item.min_quantity - item.min_quantity * 0.1)
      return "Needs Restocking";
    if (
      item.current_quantity > item.min_quantity - item.min_quantity * 0.1 &&
      item.current_quantity < item.min_quantity + item.min_quantity * 0.1
    )
      return "Limited";
    return "Plenty";
  };

  const categoryCounts = {
    "Needs Restocking": 0,
    Limited: 0,
    Plenty: 0,
  };

  visibleItems.forEach((item) => {
    const category = categorizeItem(item);
    categoryCounts[category]++;
  });

  const totalStockValue = visibleItems.reduce(
    (sum, item) => sum + item.current_quantity * item.pricePerUnit,
    0
  );

  return (
    <>
      <Sidebar />
      <div className="p-6 min-h-screen ml-12 bg-white">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-[#1a237e] text-center">
            Stock Management Dashboard
          </h1>
        </header>

        <div className="mb-6">
          <UserProfileCard
            name={currentUser.name}
            email={currentUser.email}
            role={currentUser.role}
            assignedZones={currentUser.assignedZones}
          />
        </div>

        <h2 className="text-2xl font-bold text-[#1a237e] mb-4 text-center">
          Items Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 text-center">
          <OverviewCard title="Total Items" value={visibleItems.length} />
          <OverviewCard title="Total Quantity Available" value={totalQuantity} />
          {/* <OverviewCard title="Total Stock Value" value={`₹${totalStockValue}`} /> */}
          <OverviewCard title="Needs Restocking" value={categoryCounts["Needs Restocking"]} color="#0d47a1" />
          <OverviewCard title="Limited Stock" value={categoryCounts["Limited"]} color="#1565c0" />
          <OverviewCard title="Plenty Available" value={categoryCounts["Plenty"]} color="#1e88e5" />
        </div>

        <div className="text-right">
          <Link to="/items" className="text-[#1a237e] hover:underline font-medium text-sm">
            More Details
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-[#1a237e] mb-4 mt-8 text-center">
          Analysis Overview
        </h2>
        <div className="bg-[#e8eaf6] p-4 rounded shadow mb-6 text-center">
          <ul className="list-disc list-inside text-[#1a237e] text-sm space-y-2">
            <li><strong>Stock Levels:</strong> Bar chart showing quantity of each product.</li>
            <li><strong>Restocking Status:</strong> Pie chart visualizing items that need restocking.</li>
            <li><strong>Zone Distribution:</strong> Doughnut chart showing how items are spread across zones.</li>
          </ul>
        </div>
        <div className="text-right mt-4">
          <Link to="/itemanalysis" className="text-[#1a237e] hover:underline font-medium text-sm">
            View Full Analysis
          </Link>
        </div>
      </div>
    </>
  );
}

function OverviewCard({ title, value, color = "#1a237e" }) {
  return (
    <div className="bg-[#f4f6fc] p-4 rounded shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-2" style={{ color }}>{title}</h3>
      <p className="text-sm mb-1" style={{ color }}>{value}</p>
    </div>
  );
}
