/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  categoryIcon,
  dashboardColorIcon,
  discColorIcon,
  discIcon,
  statsColorIcon,
  statsIcon,
} from "../../assets/data/icons";

const SidebarItem = ({ path, label, activeIcon, inactiveIcon }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname.startsWith(path);

  return (
    <li
      onClick={() => navigate(path)}
      className={`flex flex-row rounded-md gap-4 w-full px-4 py-2 cursor-pointer transition duration-200 relative ${
        isActive ? "bg-[#e7e7ff] text-[#696cff]" : "hover:bg-gray-200"
      }`}
    >
      <img src={isActive ? activeIcon : inactiveIcon} alt={`${label} Icon`} />
      <Link to={path} className="flex-1">
        {label}
      </Link>
      {isActive && (
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full rounded-l-xl bg-[#696cff]" />
      )}
    </li>
  );
};

export default function MentorSidebar() {
  return (
    <ul className="flex flex-col justify-start items-start gap-4">
      <SidebarItem
        path="/dashboard/mentor"
        label="Dashboard"
        activeIcon={dashboardColorIcon}
        inactiveIcon={categoryIcon}
      />
      <SidebarItem
        path="/dashboard/mystats"
        label="My Stats"
        activeIcon={statsColorIcon}
        inactiveIcon={statsIcon}
      />
      <SidebarItem
        path="/dashboard/jobfeed"
        label="Job Feed"
        activeIcon={discColorIcon}
        inactiveIcon={discIcon}
      />
    </ul>
  );
}
