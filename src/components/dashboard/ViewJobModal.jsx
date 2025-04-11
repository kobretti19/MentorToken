/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function ViewJobModal({ job, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!job) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Job Details */}
        <div className="flex flex-col items-start gap-y-5 p-4">
          <div className="flex flex-row gap-x-4 items-start">
            <img
              src={
                job?.companyId?.photo
                  ? `http://127.0.0.1:3000/${job.companyId.photo}`
                  : "/default-logo.png"
              }
              alt={job?.title || "Job Image"}
              className="w-16 h-16 mb-4 rounded-full object-cover"
            />
            <h2 className="text-md mt-2 font-semibold text-[#404D61] w-1/2">
              {job?.title}
            </h2>
          </div>

          <h3 className="text-md font-semibold text-[#566A7F]">
            New Job Offer
          </h3>
          <p className="text-sm text-[#757D8A]">{job?.description}</p>
        </div>
      </div>
    </div>
  );
}
