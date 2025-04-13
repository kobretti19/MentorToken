import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clockIcon } from "../../assets/data/icons";

export default function AplicationSent() {
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
          `http://localhost:3000/api/v1/assignments/user/${data._id}`
        );
        setAssignments(
          response.data.filter(
            (job) => job.applicationType === "mentorToCompany"
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

  console.log(assignments, "DATA");

  if (!data) return <div>Loading user data...</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>No aplications found</div>;

  return (
    <div className="flex flex-col   justify-start h-[50%]  mt-6 text-[#566a7f] w-full gap-y-4">
      <h1 className="text-[24px] text-[#566a7f] py-3 text-[500] font-semibold ">
        Applications sent{" "}
      </h1>
      <h1 className=" mb-4 pb-2">Jobs you have applied to</h1>
      <div className="flex flex-col h-full w-full gap-y-4 overflow-y-auto">
        {assignments.length > 0 ? (
          assignments.map((job) => (
            <div
              key={job._id}
              className="flex flex-row justify-between  px-6 py-4 items-center h-[62px] w-full bg-white"
            >
              <p>{job?.jobId?.title}</p>
              <img src={clockIcon} alt="Clock Icon" />
            </div>
          ))
        ) : (
          <p>No Jobs found for this user.</p>
        )}
      </div>
    </div>
  );
}
