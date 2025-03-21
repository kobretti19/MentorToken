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
        const filteredMentors = response.data.filter(
          (user) => user.role === "mentor"
        );

        setMentors(filteredMentors);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="flex flex-col justify-start mt-0 py-4 text-[#566a7f] w-full gap-y-4">
      <h1 className="text-[24px] mb-4 font-medium">Best Performing Mentors</h1>
      <div className="flex flex-col h-full w-full p-0 space-y-0.5 overflow-y-auto max-h-[400px] rounded-y-lg">
        {isLoading ? (
          <p>Loading mentors...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : mentors.length > 0 ? (
          mentors.map((user, i) => {
            const achived =
              user.mentorJobs.filter((job) => job.status !== "rejected")
                .length || 0;

            return (
              <div
                key={user._id}
                className={`flex flex-row justify-between px-10 py-7 items-center w-full 
              ${i % 2 === 0 ? "bg-[#ffffff99]" : "bg-white"} 
              ${i === 0 ? "rounded-t-xl" : ""} 
              ${i === mentors.length - 1 ? "rounded-b-xl" : ""}
              transition-all duration-300 cursor-pointer hover:shadow-lg`}
              >
                <div className="flex flex-row justify-between items-center gap-x-8">
                  <img
                    src={`http://127.0.0.1:3000/${user.photo}`}
                    alt="Profile"
                    className="rounded-full object-cover border-8 border-white w-20 h-20 shadow-xl"
                  />
                  <p className="text-[#8B8795] text-xl">
                    {user.name || "No Name"}
                  </p>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <p className="text-[#696cff] text-2xl">{achived}</p>
                  <p className="text-[#c1cedd]">Achieved Jobs</p>
                </div>
                <img src={arrowsIcon} alt="Icon Arrow" />
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
