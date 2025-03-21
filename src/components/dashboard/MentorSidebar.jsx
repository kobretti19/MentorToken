import { Link, useLocation } from "react-router-dom"; // Correct import
import { categoryIcon, discIcon, statsIcon } from "../../assets/data/icons";

export default function MentorSidebar() {
  const location = useLocation(); // Get the current URL path

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <ul className="flex flex-col justify-start items-start gap-4">
      {/* Dashboard Link */}
      <li
        className={`flex flex-row rounded-md gap-4 w-full px-4 py-2 cursor-pointer transition relative duration-200 ${
          isActive("/dashboard/mentor")
            ? "bg-[#e7e7ff] text-[#696cff]"
            : "hover:bg-gray-200"
        }`}
      >
        <img src={categoryIcon} alt="Dashboard Icon" />
        <Link to="/dashboard/mentor">Dashboard</Link>

        {isActive("/dashboard/mentor") && (
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full rounded-l-xl  bg-[#696cff]" />
        )}
      </li>

      {/* My Stats Link */}
      <li
        className={`flex flex-row rounded-md gap-4 w-full px-4 py-2 cursor-pointer relative transition duration-200 ${
          isActive("/dashboard/mystats")
            ? "bg-[#e7e7ff] text-[#696cff]"
            : "hover:bg-gray-200"
        }`}
      >
        <img src={statsIcon} alt="My Stats Icon" />
        <Link to="/dashboard/mystats">My Stats</Link>

        {isActive("/dashboard/mystats") && (
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full rounded-l-xl  bg-[#696cff]" />
        )}
      </li>

      {/* Job Feed Link */}
      <li
        className={`flex flex-row rounded-md gap-4 w-full px-4 py-2 cursor-pointer transition relative duration-200 ${
          isActive("/dashboard/jobfeed")
            ? "bg-[#e7e7ff] text-[#696cff]"
            : "hover:bg-gray-200"
        }`}
      >
        <img src={discIcon} alt="Job Feed Icon" />
        <Link to="/dashboard/jobfeed">Job Feed</Link>
        {isActive("/dashboard/jobfeed") && (
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full rounded-l-xl  bg-[#696cff]" />
        )}
      </li>
    </ul>
  );
}
