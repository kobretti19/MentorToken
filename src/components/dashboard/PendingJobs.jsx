import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PendingJobs() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = useSelector((state) => state.createUser?.data);

  useEffect(() => {
    if (!data?._id) return;

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/assignments/user/${data._id}`
        );

        const filtered = Array.isArray(response.data)
          ? response.data.filter(
              (job) =>
                job?.acceptedStatus === "in progress" &&
                job?.applicationType === "companyToMentor"
            )
          : [];

        setAssignments(filtered);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [data]);

  const handleClick = async (acceptedStatus, jobId, mentorId, assignmentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/assignments/${assignmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ acceptedStatus, jobId, mentorId }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Updated:", result);
        setAssignments((prev) =>
          prev.filter((job) => job._id !== assignmentId)
        );
      } else {
        console.error("Failed to update job:", result?.message || result);
      }
    } catch (e) {
      console.error("Update failed:", e.message || e);
    }
  };

  if (!data?._id) return <div>Loading user data...</div>;
  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div className="text-red-500">No Pending Jobs found</div>;

  return (
    <div className="flex flex-col h-[30%] overflow-y-auto justify-start py-4 text-[#566a7f] w-full gap-y-4">
      <h1 className="text-2xl text-[#404D61] font-semibold">Pending Jobs</h1>
      <p className="mb-4">Jobs offered from your startup</p>

      <div className="flex flex-col h-full w-full gap-y-4 overflow-y-auto">
        {assignments.length > 0 ? (
          assignments.map((job) => (
            <div
              key={job._id}
              className="flex flex-row justify-between px-6 py-4 items-center h-[62px] w-full bg-white rounded-xl shadow-sm"
            >
              <p>{job?.jobId?.title || "Untitled Job"}</p>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() =>
                    handleClick(
                      "done",
                      job?.jobId?._id,
                      job?.mentorId?._id,
                      job?._id
                    )
                  }
                  className="text-sm text-white rounded-xl px-6 py-1 bg-[#696cff]"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleClick(
                      "rejected",
                      job?.jobId?._id,
                      job?.mentorId?._id,
                      job?._id
                    )
                  }
                  className="text-sm text-red-500 border border-red-500 rounded-xl px-6 py-1 bg-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No Pending Jobs found for this user.</p>
        )}
      </div>
    </div>
  );
}
