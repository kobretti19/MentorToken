import { Link } from "react-router";
import { categoryIcon, discIcon, statsIcon } from "../../assets/data/icons";
import {
  handleDashboardMentor,
  handlejobFeedMentor,
  handlemyStatsMentor,
} from "../../app/sideBar";

import { useDispatch, useSelector } from "react-redux";

export default function MentorSidebar() {
  const dashboardMentor = useSelector(
    (state) => state.sidebarController.dashboardMentor
  );
  const myStats = useSelector((state) => state.sidebarController.myStats);
  const jobFeed = useSelector((state) => state.sidebarController.jobFeed);

  const dispatch = useDispatch();

  console.log(dashboardMentor);

  return (
    <ul className="flex flex-col justify-start items-start gap-4 ">
      <li
        className={`flex flex-row rounded-md  gap-4  w-full px-4 py-2 ${
          dashboardMentor && "bg-[#e7e7ff] text-[#696cff]"
        }`}
      >
        <img src={categoryIcon} alt="Icon Image" />
        <Link
          onClick={() => dispatch(handleDashboardMentor(true))}
          to="/dashboard"
        >
          Dashboard
        </Link>
      </li>
      <li
        className={`flex flex-row rounded-md  gap-4  w-full px-4 py-2 ${
          myStats && "bg-[#e7e7ff] text-[#696cff]"
        }`}
      >
        <img src={statsIcon} alt="Icon Image" />
        <Link onClick={() => dispatch(handlemyStatsMentor(true))} to="/mystats">
          My Stats
        </Link>
      </li>
      <li
        className={`flex flex-row rounded-md  gap-4  w-full -ml-0.5 px-4 py-2 ${
          jobFeed && "bg-[#e7e7ff] text-[#696cff]"
        }`}
      >
        <img src={discIcon} alt="Icon Image" />
        <Link onClick={() => dispatch(handlejobFeedMentor(true))} to="/jobs">
          Job Feed
        </Link>
      </li>
    </ul>
  );
}
