import AssignedJobs from "../../components/dashboard/AssignedJobs";
import PendingJobs from "../../components/dashboard/PendingJobs";
import AplicationSent from "../../components/dashboard/AplicationSent";

export default function MentorDashboard() {
  const dashBoardRender = (
    <div className="flex flex-row justify-start  gap-10 items-start w-full ">
      <AssignedJobs />
      <div className="flex flex-col h-screen justify-start items-center text-[#566a7f] w-[40%] mr-10 gap-y-4">
        <PendingJobs />
        <AplicationSent />
      </div>
    </div>
  );

  return <div className="flex flex-row  gap-10 mr-10">{dashBoardRender}</div>;
}
