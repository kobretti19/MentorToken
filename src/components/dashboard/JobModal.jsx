/* eslint-disable react/prop-types */

import axios from "axios";
import { useSelector } from "react-redux";

export default function JobModal({ job, onClose, modal }) {
  const userData = useSelector((state) => state.createUser.data);

  console.log(job, "job");

  const handleApplyClick = async (jobId, companyId, mentorId) => {
    try {
      const applicationType = "mentorToCompany";

      const response = await axios.post(
        "http://localhost:3000/api/v1/assignments",
        {
          jobId,
          companyId,
          mentorId,
          applicationType,
        }
      );

      console.log("Application successful:", response.data);
      modal(null);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply. Please try again.");
    }
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        {/* Job Details */}
        <div className="flex flex-col items-start gap-y-5 p-4">
          <div className="flex flex-row  gap-x-4 items-start">
            <img
              src={`http://127.0.0.1:3000/${job.companyId.photo}`}
              alt={job?.title}
              className="w-16 h-16 mb-4 rounded-full"
            />
            <h2 className="text-md mt-2 font-[600] text-[#404D61] w-1/2">
              {job?.title}
            </h2>
          </div>

          <h3 className="text-md font-[600]  text-[#566A7F] ">New Job Offer</h3>
          <p className="text-sm text-[#757D8A]">{job?.description}</p>

          <button
            onClick={() =>
              handleApplyClick(job._id, job.companyId, userData?._id)
            }
            className="bg-[#696cff] text-white px-6 py-2 text-sm rounded-lg mt-4"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
