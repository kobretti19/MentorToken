import useFetchAssignments from "../../hooks/useFetchAssignments";
import useFetchToken from "../../hooks/useFetchToken";

export default function OverviewComponent() {
  const { applied, totalJobs, loading, error, finished } =
    useFetchAssignments();

  const token = localStorage.getItem("token");

  const { data } = useFetchToken("http://127.0.0.1:3000/api/v1/jobs", token);

  console.log(data, "data");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4 bg-[#f5f5f9] p-4 ">
      <div className="bg-white rounded-lg shadow-md px-6 py-3.5">
        <h2 className="text-lg  text-gray-700">Total Jobs</h2>
        <p className="text-xl font-bold text-[#404D61]">{data?.length}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md px-6 py-3.5">
        <h2 className="text-lg text-gray-700">Total Assigned Jobs</h2>
        <p className="text-xl font-bold text-[#404D61]">{totalJobs}</p>
      </div>
      <div className="bg-white rounded-lg shadow-md px-6 py-3.5">
        <h2 className="text-lg text-gray-700">Jobs That You Have Applied</h2>
        <p className="text-xl font-bold text-[#404D61]">{applied}</p>
      </div>
      <div className="bg-[#696cff] rounded-lg text-white shadow-md px-6 py-3.5">
        <h2 className="text-lg">Finished Jobs</h2>
        <p className="text-xl font-bold ">{finished}</p>
      </div>
    </div>
  );
}
