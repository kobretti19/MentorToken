import axios from "axios";
import { useState } from "react";
import { gridIcon } from "../../assets/data/icons";
import useFetch from "../../hooks/useFetch";
import JobModal from "../../hooks/JobModal";

export default function JobFeed() {
  const [selectedJob, setSelectedJob] = useState(null);
  const { data, isFetched, isLoading } = useFetch(
    "http://127.0.0.1:3000/api/v1/jobs"
  );

  const filteredJobs = data?.filter((job) => job.status !== "done") || [];

  const handleViewMore = (jobId) => {
    axios
      .get(`http://localhost:3000/api/v1/jobs/${jobId}`)
      .then((response) => {
        setSelectedJob(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="flex flex-col my-8">
      {/* Jobs Listing */}
      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl text-[#404D61] mb-8">
          Your Startup Jobs
        </h2>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row justify-between gap-4">
            <button className="bg-white px-4 py-2 rounded-xl">
              Sort By: Popular
            </button>
            <button className="bg-white px-4 py-2 rounded-xl">
              All Category
            </button>
          </div>
          <div className="flex flex-row gap-4">
            <button className="bg-white px-4 py-2 rounded-xl">Filters</button>
            <img
              className="bg-white px-4 py-2 rounded-xl"
              src={gridIcon}
              alt="Grid Icon"
            />
          </div>
        </div>
      </div>
      {/* Jobs List */}
      <div className="flex flex-wrap gap-x-4 gap-y-6 mt-10">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : !isFetched || filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No available jobs</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              className="flex flex-col justify-between gap-y-4 bg-white text-[#757D8A] w-60 h-72 rounded-xl px-3 py-4 shadow-md"
              key={job._id}
            >
              <div className="flex flex-col justify-between items-start gap-y-3 w-1/8">
                <h2 className="text-[#566A7F]">{job?.title}</h2>
                <h3 className="text-[#566A7F] font-semibold">New Job Offer</h3>
              </div>

              <p className="text-sm text-[#757D8A]">{job?.description}</p>
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
