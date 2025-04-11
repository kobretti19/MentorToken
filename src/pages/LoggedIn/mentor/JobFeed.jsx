import axios from "axios";
import { useState } from "react";
import { combinedShapeIcon, gridIcon } from "../../../assets/data/icons";
import JobModal from "../../../components/dashboard/JobModal";
import useFetchToken from "../../../hooks/useFetchToken";

export default function JobFeed() {
  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem("token");
  const { data, error, loading } = useFetchToken(
    "http://127.0.0.1:3000/api/v1/jobs",
    token
  );

  const filteredJobs = data || [];

  const handleViewMore = (jobId) => {
    axios
      .get(`http://localhost:3000/api/v1/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSelectedJob(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="flex flex-col my-6 w-[90%]">
      {/* Jobs Listing */}
      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl text-[#566a7f] mb-8">
          Your Startup Jobs
        </h2>
      </div>
      {/* Jobs List */}
      <div className="flex flex-wrap gap-x-8 gap-y-6 mt-10">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row justify-between gap-4">
            <button className="bg-white px-4 py-2 rounded-xl">
              Sort By: Popular
            </button>
            <button className="bg-white px-4 py-2 rounded-xl">
              All Category
            </button>
          </div>
          <div className="flex flex-row gap-4 ">
            <div className="flex flex-row justify-around items-center space-x-2 px-4 bg-white rounded-xl">
              <img src={combinedShapeIcon} alt="Shape Icon" />
              <button className=" text-[#566A7F]  ">Filters</button>
            </div>

            <img
              className="bg-white px-4 py-2 rounded-xl"
              src={gridIcon}
              alt="Grid Icon"
            />
          </div>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading jobs!</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No available jobs</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              className="flex flex-col justify-around gap-y-3 bg-white text-[#757D8A] w-60 h-72 rounded-xl px-3 py-4 shadow-md"
              key={job._id}
            >
              <div className="flex flex-col items-start gap-y-3 w-1/8">
                <div className="flex flex-row items-center justify-start gap-x-4">
                  <img
                    src={`http://127.0.0.1:3000/${job?.companyId.photo}`}
                    alt=""
                    className="w-16 h-16 rounded-3xl"
                  />
                  <h2 className="text-[#566A7F]">{job?.companyId.name}</h2>
                </div>

                <h3 className="text-[#566A7F] font-[600]">{job?.title}</h3>
              </div>

              <p className="text-sm text-[#757D8A] h-20 overflow-y-hidden">
                {job?.description}
              </p>
              <button
                onClick={() => handleViewMore(job._id)}
                className="bg-[#696cff] text-white px-4 py-2 rounded-lg w-2/3 text-sm"
              >
                View More
              </button>
            </div>
          ))
        )}
      </div>
      {/* Job Details Modal */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          modal={setSelectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}
