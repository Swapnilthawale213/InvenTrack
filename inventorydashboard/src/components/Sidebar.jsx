import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaChartBar, FaInfoCircle } from "react-icons/fa";

const navItems = [
  { path: "/user", icon: <FaTachometerAlt />, label: "Dashboard" },
  { path: "/items", icon: <FaBoxOpen />, label: "Items" },
  { path: "/itemanalysis", icon: <FaChartBar />, label: "Analysis" },
  { path: "/zoneinfo", icon: <FaInfoCircle />, label: "Info" },
];

export default function Sidebar() {
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
