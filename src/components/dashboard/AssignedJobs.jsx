import useFetchAssignments from "../../hooks/useFetchAssignments";
import NavbarDashboard from "./NavbarDashboard";

export default function AssignedJobs() {
  const { assignments, loading, error } = useFetchAssignments();
  return (
    <div className="flex flex-col h-screen  justify-start   text-[#566a7f] w-[45%]">
      <h1 className="font-semibold text-2xl text-[#566a7f] mb-6 ">
        Assigned Jobs
      </h1>
      <div className="flex flex-col h-full w-full gap-y-4 overflow-y-auto">
        <NavbarDashboard
          assignments={assignments}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
