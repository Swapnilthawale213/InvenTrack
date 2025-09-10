import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialZones } from "../data/zonesData";
import AdminSidebar from "../components/AdminSidebar";
import UserProfileCard from "../components/UserProfileCard";
import useSessionTimeout from "../hooks/useSessionTimeout";
import { useSession } from "../context/SessionContext";

export default function Dashboard() {
  useSessionTimeout();
  const { sessionData } = useSession();
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const storedSession = sessionStorage.getItem("sessionData");
    if (!storedSession) {
      navigate('/');
    }
    setCheckingSession(false);

    // Prevent back navigation after logout
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }, [navigate]);

  if (checkingSession) return null; // or a loading spinner

  const adminProfile = {
    role: sessionData?.role || "Admin",
    name: sessionData?.user.name || "Swapnil Thawale",
    email: sessionData?.user.email || "swapnil.thawale@cognizant.com",
    assignedZones: initialZones.map((zone) => zone.zoneName),
  };

  return (
    <>
      <AdminSidebar />
      <div className="p-6 min-h-screen ml-12">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#281e5d]">
            Zone Management Dashboard
          </h1>
        </header>

        <UserProfileCard
          name={adminProfile.name}
          email={adminProfile.email}
          role={adminProfile.role}
          assignedZones={adminProfile.assignedZones}
        />

        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-8 text-center">Zones Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {initialZones.map((zone) => (
            <div
              key={zone.zoneId}
              className="bg-[#f4f6fc] p-4 rounded shadow hover:shadow-md transition text-center border"
            >
              <h3 className="text-lg font-semibold text-[#281e5d] mb-2">{zone.zoneName}</h3>
              <p className="text-[#3c3c6c] text-sm mb-1">Total Items: {zone.totalItems}</p>
              <p className="text-[#3c3c6c] text-sm mb-1">Budget Allocated: ₹{zone.budgetAllocated}</p>
            </div>
          ))}
        </div>

        <div className="text-right">
          <Link to="/zones" className="text-[#281e5d] hover:underline font-medium text-sm">
            More Zone Details
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-700 mb-4 mt-8 text-center">Zone Analysis Overview</h2>
        <div className="bg-[#f4f6fc] p-4 rounded shadow mb-6">
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-2 text-center">
            <li><strong>Budget Analysis:</strong> Bar chart comparing allocated vs used budget.</li>
            <li><strong>Dispatch Overview:</strong> Pie chart showing dispatch count per zone.</li>
            <li><strong>Utilization Efficiency:</strong> Doughnut chart showing budget usage percentage.</li>
          </ul>
        </div>
        <div className="text-right mt-4">
          <Link to="/zoneanalysis" className="text-[#281e5d] hover:underline font-medium text-sm">
            View Full Zone Analysis
          </Link>
        </div>
      </div>
    </>
  );
}
