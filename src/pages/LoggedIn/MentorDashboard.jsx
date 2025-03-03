import { useEffect, useState } from "react";
import SearchBar from "../../../ui/SearchBar";
import AssignedJobs from "../../components/dashboard/AssignedJobs";
import SidebarComponent from "../../components/dashboard/Sidebar";

export default function MentorDashboard() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  console.log(photo);

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
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageObjectURL = `http://127.0.0.1:3000/${data?.photo}`;
          setPhoto(imageObjectURL);
          setUser(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error fetching user data.");
        }
      } catch (e) {
        setError(e.message || "An unexpected error occurred.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex flex-row justify-start gap-4 w-full">
      <SidebarComponent />
      <div className="flex flex-col gap-6 w-2/5 mt-6 px-10">
        <SearchBar />
        <AssignedJobs />
      </div>
      <div>Best Performing Mentors</div>
      <div className="flex flex-row items-center gap-3  absolute top-10 right-20">
        {photo ? (
          <img
            src={photo}
            alt="Profile"
            className="rounded-full object-cover w-16 h-16"
          />
        ) : (
          <p>Loading...</p>
        )}
        <div className="flex flex-col text-lg text-[#566a7f]">
          <p>{user?.name}</p>
          <p className="text-gray-400">{user?.role}</p>
        </div>
      </div>
      {error && <div className="error-message text-red-500">{error}</div>}
    </div>
  );
}
