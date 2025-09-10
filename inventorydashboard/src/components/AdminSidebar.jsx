import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaChartBar, FaInfoCircle } from "react-icons/fa";

const navItems = [
  { path: "/admin", icon: <FaTachometerAlt />, label: "Dashboard" },
  { path: "/zones", icon: <FaBoxOpen />, label: "Zones" },
  { path: "/zoneanalysis", icon: <FaChartBar />, label: "Analysis" },
  { path: "/info", icon: <FaInfoCircle />, label: "Info" }, 
];

export default function AdminSidebar() {
  return (
    <div className="h-screen w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-6 fixed z-50">
      {navItems.map(({ path, icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className="group relative flex items-center justify-center w-12 h-12 hover:bg-gray-700 rounded"
        >
          {icon}
          <span className="absolute left-16 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {label}
          </span>
        </NavLink>
      ))}
    </div>
  );
}
