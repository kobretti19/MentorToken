import ErrorBlock from "../../../ui/ErrorBlock";
import useFetchToken from "../../hooks/useFetchToken";

export default function QuickOverview() {
  const token = localStorage.getItem("token");
  const { data, error, loading } = useFetchToken(
    "http://127.0.0.1:3000/api/v1/jobs/overview",
    token
  );

  console.log(data, "total");

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        Loading...
      </div>
    );

  if (error)
    return <ErrorBlock title="No Data available" message={error.message} />;

  return (
    <div className="flex flex-col w-full md:w-96 gap-y-4 justify-center mt-10">
      {/* Header */}
      <div>
        <h1 className="font-semibold text-2xl text-[#404D61]">
          Quick Overview
        </h1>
        <h3 className="text-gray-600">In the last month</h3>
      </div>

      {/* Overview Cards */}
      <div className="flex flex-col w-full gap-y-5">
        {/* Total Mentors */}
        <div className="bg-white rounded-xl flex flex-col items-start justify-center px-6 py-4 shadow-md">
          <h3 className="text-[#757D8A] font-medium">Total Mentors</h3>
          <h2 className="text-[#404D61] text-xl font-semibold">
            {data?.resultsMentors}
          </h2>
        </div>

        {/* Total Assigned Jobs */}
        <div className="bg-white rounded-xl flex flex-col items-start justify-center px-6 py-4 shadow-md">
          <h3 className="text-[#757D8A] font-medium">Total Assigned Jobs</h3>
          <h2 className="text-[#404D61] text-xl font-semibold">
            {data?.resultsAssigned}
          </h2>
        </div>

        {/* Finished Jobs */}
        <div className="bg-[#696CFF] text-white rounded-xl flex flex-col items-start justify-center px-6 py-4 shadow-md">
          <h3 className="font-medium">Finished Jobs</h3>
          <h2 className="text-xl font-semibold">{data?.resultsFinished}</h2>
        </div>
      </div>
    </div>
  );
}
