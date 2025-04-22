import AssignedJobs from "../../components/dashboard/AssignedJobs";
import BestMentors from "../../components/dashboard/BestMentors";
import StatisticComponent from "../../components/dashboard/Statistic";

export default function StartUpDashboard() {
  const dashBoardRender = (
    <div className="flex flex-row justify-start gap-10 items-center w-full pt-10 pb-10">
      <AssignedJobs />
      <div className="flex flex-col h-screen justify-start   text-[#566a7f] w-1/2 mr-10 gap-y-4">
        <BestMentors />
        <StatisticComponent />
      </div>
    </div>
  );

  return <div className="flex flex-row  gap-10 mr-10">{dashBoardRender}</div>;
}
