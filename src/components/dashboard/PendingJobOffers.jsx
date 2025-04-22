/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PendingJobOffersComponent() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = useSelector((state) => state.createUser.data);
  const mentorData = useSelector((state) => state.createUser.mentor);
  const data = mentorData?.data.data;

  useEffect(() => {
    if (!data?._id) return;

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/assignments/user/${data._id}`
        );
        setAssignments(
          response.data.filter(
            (job) =>
              job.acceptedStatus === "in progress" &&
              job.applicationType === "companyToMentor" &&
              job.companyId._id === userData._id
          )
        );
      } catch (err) {
        setError(err.message);
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
        window.location.reload();
      } else {
        console.error("Failed to update job:", data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!data) return <div>Loading user data...</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>No Pending Job Offers found</div>;
  return (
    <div className="flex flex-col  overflow-y-auto justify-start mt-0 py-4  text-[#566a7f] w-[500px] gap-y-4">
      <h1 className="text-[24px]   text-[500]">Pending Job Offers</h1>
      <div className="flex flex-col h-full w-full gap-y-4 overflow-y-auto">
        {assignments.length > 0 ? (
          assignments.map((job) => (
            <div
              key={job._id}
              className="flex flex-row justify-between px-6 py-4 items-center h-[70px] w-full bg-white"
            >
              <p>{job?.jobId?.title}</p>
              <div className="flex flex-row justify-between gap-2">
                <button
                  onClick={() =>
                    handleClick(
                      "canceled",
                      job?.jobId._id,
                      job?.mentorId ? job?.mentorId?._id : null,
                      job?._id
                    )
                  }
                  className="text-center text-sm font-thin text-[#F2076A] rounded-xl border border-[#F2076A] px-6 py-1 bg-transparent"
                >
                  Cancel Offer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Pending Jobs found for this user.</p>
        )}
      </div>
    </div>
  );
}
