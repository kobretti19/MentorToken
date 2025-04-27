import axios from "axios";
import { useState } from "react";
import { combinedShapeIcon, gridIcon } from "../../../assets/data/icons";
import JobModal from "../../../components/dashboard/JobModal";
import useFetchToken from "../../../hooks/useFetchToken";

export default function JobFeed() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [isGridView, setIsGridView] = useState(true);

  const token = localStorage.getItem("token");
  const { data, error, loading } = useFetchToken(
    "http://127.0.0.1:3000/api/v1/jobs",
    token
  );

  const filteredJobs = data || [];

  const companyNames = [
    "All",
    ...new Set(filteredJobs.map((job) => job.companyId.name)),
  ];

  let visibleJobs;
  if (selectedCompany === "All") {
    visibleJobs = filteredJobs;
  } else if (selectedCompany === "popular") {
    visibleJobs = filteredJobs.filter((job) => job.assignments.length > 1);
  } else {
    visibleJobs = filteredJobs.filter(
      (job) => job.companyId.name === selectedCompany
    );
  }

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
      {/* Header */}
      <div className="flex flex-col">
        <h2 className="font-semibold text-2xl text-[#566a7f] mb-8">
          Your Startup Jobs
        </h2>
      </div>

      {/* Filter & View Controls */}
      <div className="flex flex-wrap gap-x-8 gap-y-6 mt-10">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row justify-between gap-4">
            <button
              onClick={() => setSelectedCompany("popular")}
              className="bg-white px-4 py-2 rounded-xl"
            >
              Sort By: Popular
            </button>
            <button
              onClick={() => setSelectedCompany("All")}
              className="bg-white px-4 py-2 rounded-xl"
            >
              All Category
            </button>
          </div>

          <div className="flex flex-row gap-4 relative ">
            {/* Filter Dropdown */}
            <div className="relative ">
              <div
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex flex-row justify-around items-center space-x-2 px-4 bg-white rounded-xl cursor-pointer"
              >
                <img src={combinedShapeIcon} alt="Shape Icon" />
                <button className="text-[#566A7F] py-4">Filters</button>
              </div>

              {showFilterMenu && (
                <ul className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {companyNames.map((name, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedCompany(name);
                        setShowFilterMenu(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        selectedCompany === name
                          ? "font-bold text-[#696cff]"
                          : ""
                      }`}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Toggle View Button */}
            <img
              onClick={() => setIsGridView(!isGridView)}
              className="bg-white px-4 py-2 rounded-xl cursor-pointer"
              src={gridIcon}
              alt="Toggle View"
            />
          </div>
        </div>

        {/* Job List */}
        <div
          className={`flex ${
            isGridView ? "flex-wrap gap-6" : "flex-col gap-4 w-[80%]"
          } w-full mt-6`}
        >
          {loading ? (
            <p className="text-center text-gray-500 w-full">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-500 w-full">
              Error loading jobs!
            </p>
          ) : visibleJobs.length === 0 ? (
            <p className="text-center text-gray-500 w-full">
              No available jobs
            </p>
          ) : (
            visibleJobs.map((job) => (
              <div
                className={`flex ${
                  isGridView
                    ? "flex-col w-60 h-72"
                    : "flex-row w-full h-auto items-start justify-between min-h-44"
                } gap-4 bg-white text-[#757D8A] rounded-xl px-4 py-4 shadow-md`}
                key={job._id}
              >
                <div
                  className={`flex ${
                    isGridView ? "flex-col" : "flex-row items-center w-[200px]"
                  } gap-4`}
                >
                  <img
                    src={`http://127.0.0.1:3000/${job?.companyId.photo}`}
                    alt="Company Logo"
                    className="w-16 h-16 rounded-3xl"
                  />
                  <div>
                    <h2 className="text-[#566A7F] font-semibold">
                      {job?.companyId.name}
                    </h2>
                    <h3 className="text-[#566A7F] font-bold">{job?.title}</h3>
                  </div>
                </div>

                <p
                  className={`text-sm text-[#757D8A] ${
                    isGridView ? "h-20 overflow-hidden" : "w-[50%]"
                  }`}
                >
                  {job?.description}
                </p>

                <button
                  onClick={() => handleViewMore(job._id)}
                  className="bg-[#696cff] text-white px-4 py-2 rounded-lg text-sm w-fit mt-auto"
                >
                  View More
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
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
