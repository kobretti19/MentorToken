/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PendingJobsStartUp({ mentorId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const data = useSelector((state) => state.createUser.data);

  useEffect(() => {
    if (!data?._id) return;

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/assignments/user/${data?._id}`
        );
        setAssignments(
          response.data.filter(
            (job) =>
              job.applicationType === "mentorToCompany" &&
              job.mentorId._id === mentorId &&
              job.acceptedStatus !== "rejected"
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [data, mentorId]);

  console.log(assignments, "data");

  const handleClick = async (acceptedStatus, jobId, mentorId, assignmentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/assignments/${assignmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            acceptedStatus,
            jobId,
            mentorId,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Updated:", data);

        setAssignments((prevAssignments) =>
          prevAssignments.filter((job) => job._id !== assignmentId)
        );
      } else {
        console.error("Failed to update job:", data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!data) return <div>Loading user data...</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>No data found</div>;
  return (
    <div className="flex flex-col h-[45%]  justify-start mt-0  py-4  text-[#566a7f] w-[100%] gap-y-2">
      <h1 className="text-[24px] text-[#404d61bf]">Pending Jobs from User</h1>

      <div className="flex flex-col min-h-56 w-full gap-y-4 overflow-y-auto mt-2">
        {assignments.length > 0 ? (
          assignments.map((job) => {
            return (
              <div
                key={job._id}
                className="flex flex-row justify-between px-6 py-4 items-center h-[62px] w-full bg-white"
              >
                <p>{job?.jobId?.title}</p>
                <div className="flex flex-row justify-between gap-2">
                  <button
                    onClick={() =>
                      handleClick(
                        "done",
                        job?.jobId._id,
                        job?.mentorId._id,
                        job?._id
                      )
                    }
                    className="text-center text-sm font-thin text-white rounded-xl px-6 py-1 bg-[#696cff]"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleClick(
                        "rejected",
                        job?.jobId._id,
                        job?.mentorId._id,
                        job?._id
                      )
                    }
                    className="text-center text-sm font-thin text-red-500 border border-red-500 rounded-xl px-6 py-1 bg-white"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Pending Jobs found for this user.</p>
        )}
      </div>
    </div>
  );
}
