import { useEffect, useState } from "react";

export default function AssignedJobs() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        setError("No token found, please login.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/users/finduser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching user data.");
        }
      } catch (e) {
        setError(e);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col  mt-6 text-[#566a7f]">
      <h1 className="text-[24px] text-[500] mb-10 ">Assigned Jobs</h1>
      {user?.assignments.map((job) => (
        <div
          className="flex flex-row justify-between px-6 py-4 items-center  w-full bg-white"
          key={job._id}
        >
          <h1>{job?.jobId.title}</h1>
          <h2
            className={`${
              job?.status === "in progress"
                ? "bg-[#ededff] text-[#696cff]"
                : "bg-[#ebf6eb] text-[#31aa27]"
            } px-4 py-2 rounded-2xl uppercase mr-10`}
          >
            {job?.status}
          </h2>
        </div>
      ))}
    </div>
  );
}
