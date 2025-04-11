import { useSelector } from "react-redux";
import useFetchToken from "../../../hooks/useFetchToken";
import { plusIcon } from "../../../assets/data/icons";
import { useState } from "react";
import CreateJobModal from "../../../components/dashboard/CreateJobModal";
import ViewJobModal from "../../../components/dashboard/ViewJobModal";

export default function Jobs() {
  const [createJobModal, setCreateJobModal] = useState(null);
  const [viewJobModal, setViewJobModal] = useState(null);
  const userData = useSelector((state) => state.createUser.data);
  const token = localStorage.getItem("token");

  console.log(viewJobModal, "viewJobModal");

  const { data, error, loading } = useFetchToken(
    userData?._id
      ? `http://127.0.0.1:3000/api/v1/jobs/user/${userData._id}`
      : null,
    token
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading jobs...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-500 font-medium">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="py-6 mt-10 w-[95%]">
      {/* Header */}
      <div className="flex flex-row justify-between w-full 2xl:w-[90%]">
        <h1 className="text-2xl font-bold text-[#404D61] mb-4">
          Your Startup Jobs
        </h1>
        <button
          onClick={() => setCreateJobModal(true)}
          className="flex flex-row justify-center items-center gap-x-1 bg-[#696cff] text-white px-4 rounded-xl hover:bg-[#696cffdf] hover:scale-105 transition-all  mr-2"
        >
          <span>
            <img src={plusIcon} alt="Add Job" />
          </span>
          Create New Job
        </button>
      </div>

      {/* Jobs List */}
      <div className="flex flex-row flex-wrap gap-8 justify-start mt-10">
        {data?.data?.map((job) => (
          <div
            key={job._id}
            className="bg-white flex flex-col justify-between shadow-md rounded-xl p-4 w-[242px] h-[284px]"
          >
            {/* Company Logo & Job Title */}
            <div className="flex items-center gap-3 mb-2">
              {job.companyId?.photo && (
                <img
                  src={`http://127.0.0.1:3000/${job.companyId.photo}`}
                  alt="Company Logo"
                  className="w-10 h-10 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <h2 className="text-lg font-semibold text-[#566A7F]">
                {job.title}
              </h2>
            </div>

            <h3 className="font-semibold text-[#566A7F] mb-2">New Job Offer</h3>

            {/* Job Description */}
            <p className="text-gray-600 text-sm h-24 overflow-y-hidden">
              {job.description}
            </p>

            {/* Applicants & Action Button */}
            <div className="flex items-start justify-between mt-3 h-16 pt-4">
              {/* Applicants List */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex -space-x-2">
                  {job.assignments
                    ?.slice(0, 3)
                    .map((assignment, index) =>
                      assignment.mentorId?.photo ? (
                        <img
                          key={index}
                          src={`http://127.0.0.1:3000/${assignment.mentorId.photo}`}
                          alt="Applicant"
                          className="w-8 h-8 rounded-full border-2 border-white"
                          loading="lazy"
                        />
                      ) : null
                    )}
                </div>
                {job.assignments?.length > 3 && (
                  <p className="text-xs text-gray-500">{`+${
                    job.assignments.length - 3
                  } Applicants`}</p>
                )}
              </div>

              {/* View More Button */}
              <button
                onClick={() => setViewJobModal(job)}
                className="bg-[#696cff] text-white px-3 py-2 text-sm rounded-lg hover:bg-[#696cffe8] hover:scale-110 transition-all"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Job Modal */}
      {createJobModal && (
        <CreateJobModal
          modal={createJobModal}
          startUp={userData?._id}
          onClose={() => setCreateJobModal(null)}
        />
      )}

      {viewJobModal && (
        <ViewJobModal
          job={viewJobModal}
          onClose={() => setViewJobModal(null)}
        />
      )}
    </div>
  );
}
