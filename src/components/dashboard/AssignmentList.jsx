import { useMemo } from "react";

// eslint-disable-next-line react/prop-types
const AssignmentList = ({ assignments, activeTab }) => {
  const normalizeStatus = (status) => status?.toLowerCase().replace(/\s+/g, "");

  const getStatusColorClass = (status) => {
    if (!status) return "bg-gray-500 text-white";

    const statusColors = {
      done: "bg-[#ebf6eb] text-[#31aa27]",
      rejected: "bg-[#fff0f3] text-[#f2076a]",
      "in progress": "bg-[#e7e7ff] text-[#696cff]",
      canceled: "bg-[#fff0f3] text-[#f2076a]",
    };

    return statusColors[status] || "bg-gray-500 text-white";
  };

  const filteredAssignments = useMemo(() => {
    if (activeTab === "All") return assignments;
    // eslint-disable-next-line react/prop-types
    return assignments.filter(
      (item) =>
        normalizeStatus(item?.acceptedStatus) === normalizeStatus(activeTab)
    );
  }, [assignments, activeTab]);

  return (
    <div className="flex flex-col gap-y-4 ">
      {filteredAssignments.length > 0 ? (
        filteredAssignments.map((job) => (
          <div
            key={job._id}
            className="flex flex-row justify-between px-6 py-4 items-center w-full h-[62px] bg-white"
          >
            <p>{job?.jobId?.title}</p>
            <p
              className={`text-center text-sm px-3 py-1.5 rounded-2xl uppercase ${getStatusColorClass(
                job?.acceptedStatus
              )}`}
            >
              {job?.acceptedStatus}
            </p>
          </div>
        ))
      ) : (
        <p>No assignments found for this user.</p>
      )}
    </div>
  );
};

export default AssignmentList;
