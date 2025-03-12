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

  console.log(assignments, "assignments");

  useEffect(() => {
    if (!user?._id) return;

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/assignments/user/${user._id}`
        );

        const assignmentData = response.data;
        const jobsApplied = assignmentData.filter(
          (job) => job.applicationType === "mentorToCompany"
        );
        setAssignments(assignmentData);
        const finishFilter = assignmentData.filter(
          (job) => job.acceptedStatus === "done"
        );
        setFinished(finishFilter.length);
        setTotalJobs(assignmentData.length);
        setApplied(jobsApplied.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user]);

  return { assignments, applied, totalJobs, loading, error, finished };
};

export default useFetchAssignments;
