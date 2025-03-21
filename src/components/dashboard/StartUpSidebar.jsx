import { Link, useLocation } from "react-router-dom"; // Correct import
import { categoryIcon, discIcon, statsIcon } from "../../assets/data/icons";
import { useDispatch } from "react-redux";
import {
  handleDashboardMentor,
  handlejobFeedMentor,
  handlemyStatsMentor,
} from "../../app/sideBar";

export default function StartUpSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <ul className="flex flex-col justify-start items-start gap-4">
      {/* Dashboard Link */}
      <li
        className={`flex flex-row rounded-md gap-4 w-full relative px-4 py-2 cursor-pointer ${
          isActive("/dashboard/startup")
            ? "bg-[#e7e7ff] text-[#696cff]"
            : "hover:bg-gray-200"
        }`}
      >
        <img src={categoryIcon} alt="Icon Image" />
        <Link
          onClick={() => dispatch(handleDashboardMentor(true))}
          to="/dashboard/startup"
        >
          Dashboard
        </Link>
        {isActive("/dashboard/startup") && (
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full rounded-l-xl  bg-[#696cff]" />
        )}
      </li>

      {/* Mentors Link */}
      <li
        className={`flex flex-row rounded-md gap-4 w-full px-4 py-2 relative cursor-pointer ${
          isActive("/dashboard/mentors")
            ? "bg-[#e7e7ff] text-[#696cff]"
            : "hover:bg-gray-200"
        }`}
      >
        <img src={statsIcon} alt="Icon Image" />
        <Link
          onClick={() => dispatch(handlemyStatsMentor(true))}
          to="/dashboard/mentors"
        >
          Mentors
        </Link>
        {isActive("/dashboard/mentors") && (
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full rounded-l-xl  bg-[#696cff]" />
        )}
      </li>

      {/* Job Feed Link */}
      <li
        className={`flex flex-row rounded-md gap-4 w-full px-4 py-2 relative cursor-pointer ${
          isActive("/dashboard/jobs")
            ? "bg-[#e7e7ff] text-[#696cff]"
            : "hover:bg-gray-200"
        }`}
      >
        <img src={discIcon} alt="Icon Image" />
        <Link
          onClick={() => dispatch(handlejobFeedMentor(true))}
          to="/dashboard/jobs"
        >
          Jobs
        </Link>
        {isActive("/dashboard/jobs") && (
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full rounded-l-xl  bg-[#696cff]" />
        )}
      </li>
    </ul>
  );
}
