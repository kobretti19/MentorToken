import { useSelector } from "react-redux";

import StatisticComponent from "../../../components/dashboard/Statistic";
import OverviewComponent from "../../../components/dashboard/Overview";
import MentorProfile from "../../../components/dashboard/MentorProfile";

export default function MyStats() {
  const userData = useSelector((state) => state.createUser.data);

  return (
    <div className="flex flex-col w-full items-start gap-6 mt-10 ">
      <h2 className="font-semibold text-2xl text-[#404D61]">My Stats</h2>
      {/* Profile Card */}
      <MentorProfile userData={userData} />

      <div className="flex flex-row items-start justify-start h-1/3 w-full gap-6">
        <div className="w-2/4 ">
          <h2 className="font-semibold text-2xl text-[#404D61] mb-6">
            Performance Over Time
          </h2>
          <div className="bg-white rounded-xl h-64">
            <StatisticComponent />
          </div>
        </div>
        <div className="w-1/3">
          <h2 className="font-semibold text-2xl text-[#404D61] mb-2 ml-4">
            Quick Overview
          </h2>
          <div className="bg-white h-96 ">
            <OverviewComponent />
          </div>
        </div>
      </div>

      {/* Save Button */}
      {/* {isEditing && (
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-[#696cff] text-white rounded-lg"
        >
          Save Changes
        </button>
      )} */}
    </div>
  );
}
