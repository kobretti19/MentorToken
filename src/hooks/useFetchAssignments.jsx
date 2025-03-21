import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useFetchAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [applied, setApplied] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(0);

  const user = useSelector((state) => state.createUser.data);

  useEffect(() => {
    if (!user?._id) return;

    const fetchAssignments = async () => {
      setLoading(true); // Ensure this runs before the try block

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/assignments/user/${user._id}`
        );

        const assignmentData = response.data || []; // Ensure it's an array

        // Use user.role instead of assignmentData.role
        if (user.role === "mentor") {
          const jobsApplied = assignmentData.filter(
            (job) => job.applicationType === "mentorToCompany"
          );
          const finishFilter = assignmentData.filter(
            (job) => job.acceptedStatus === "done"
          );

          setAssignments(assignmentData);
          setFinished(finishFilter.length);
          setTotalJobs(assignmentData.length);
          setApplied(jobsApplied.length);
        } else if (user.role === "startup") {
          const jobsApplied = assignmentData.filter(
            (job) => job.applicationType === "companyToMentor"
          );
          const finishFilter = assignmentData.filter(
            (job) => job.acceptedStatus === "done"
          );

          setAssignments(assignmentData);
          setFinished(finishFilter.length);
          setTotalJobs(assignmentData.length);
          setApplied(jobsApplied.length);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { assignments, applied, totalJobs, loading, error, finished };
};

export default useFetchAssignments;
