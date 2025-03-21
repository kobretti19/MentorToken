/* eslint-disable react/prop-types */

import axios from "axios";
import { useSelector } from "react-redux";

export default function JobModal({ job, onClose, modal }) {
  const userData = useSelector((state) => state.createUser.data);

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
      alert("Application submitted successfully!");
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
        <div className="text-center">
          {/* <img src={job?.companyLogo} alt={job?.title} className="w-16 h-16 mx-auto mb-4 rounded-full" /> */}
          <h2 className="text-xl font-bold text-[#404D61]">{job?.title}</h2>
          <h3 className="text-lg font-semibold text-[#566A7F] mt-2">
            New Job Offer
          </h3>
          <p className="text-sm text-[#757D8A] mt-4">{job?.description}</p>

          <button
            onClick={() =>
              handleApplyClick(job._id, job.companyId, userData?._id)
            }
            className="bg-[#696cff] text-white px-6 py-2 rounded-lg mt-4"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
