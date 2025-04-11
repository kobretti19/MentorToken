import { useEffect, useState } from "react";
import axios from "axios";
import { arrowsIcon } from "../../assets/data/icons";

export default function BestMentors() {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filteredMentors = Array.isArray(response.data)
          ? response.data.filter((user) => user.role === "mentor")
          : [];

        setMentors(filteredMentors);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="flex flex-col justify-start py-4 text-[#566a7f] w-full gap-y-4">
      <h1 className="text-2xl mb-4 font-semibold">Best Performing Mentors</h1>

      <div className="flex flex-col w-full max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <p>Loading mentors...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : mentors.length > 0 ? (
          mentors.map((user, i) => {
            const achievedJobs = Array.isArray(user.mentorJobs)
              ? user.mentorJobs.filter((job) => job.status !== "rejected")
                  .length
              : 0;

            return (
              <div
                key={user._id}
                className={`flex flex-row justify-between px-10 py-7 items-center w-full 
                  ${i % 2 === 0 ? "bg-[#ffffff99]" : "bg-white"} 
                  ${i === 0 ? "rounded-t-xl" : ""} 
                  ${i === mentors.length - 1 ? "rounded-b-xl" : ""}
                  transition-all duration-300 cursor-pointer hover:shadow-md`}
              >
                <div className="flex flex-row items-center gap-x-6">
                  <img
                    src={`http://127.0.0.1:3000/${user.photo}`}
                    alt="Profile"
                    className="rounded-full object-cover border-4 border-white w-16 h-16 shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-avatar.png"; // fallback image
                    }}
                  />
                  <p className="text-[#8B8795] text-lg font-medium">
                    {user.name || "Unnamed Mentor"}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-[#696cff] text-2xl font-semibold">
                    {achievedJobs}
                  </p>
                  <p className="text-[#c1cedd] text-sm">Achieved Jobs</p>
                </div>

                <img
                  src={arrowsIcon}
                  alt="Arrow Icon"
                  className="w-6 h-6 opacity-70"
                />
              </div>
            );
          })
        ) : (
          <p>No mentors found.</p>
        )}
      </div>
    </div>
  );
}
