import NavbarDashboard from "./NavbarDashboard";

export default function AssignedJobs() {
  return (
    <div className="flex flex-col h-screen  justify-start  mt-6 text-[#566a7f] w-1/2">
      <h1 className="font-semibold text-2xl text-[#404D61] mb-6 ">
        Assigned Jobs
      </h1>
      <div className="flex flex-col h-full w-full gap-y-4 overflow-y-auto">
        <NavbarDashboard />
      </div>
    </div>
  );
}
