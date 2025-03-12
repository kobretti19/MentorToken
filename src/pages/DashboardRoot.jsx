import { Outlet } from "react-router";
import SidebarComponent from "../components/dashboard/Sidebar";
import SearchBar from "../../ui/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleData } from "../app/AuthProvider";

export default function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please login.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/v1/users/finduser",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error fetching user data.");
        }

        const data = await response.json();
        setUser(data);
        dispatch(handleData(data));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <div className="bg-[#f5f5f9] min-h-screen pb-10">
      <div className="flex flex-row gap-10 relative mr-10">
        <SidebarComponent className="flex-none w-1/3" />
        <div className="w-full">
          <SearchBar />
          <Outlet key={user} />
        </div>
      </div>

      {/* User Info Section */}
      <div className="absolute top-10 right-20 flex items-center gap-3">
        {user ? (
          <>
            <img
              src={`http://127.0.0.1:3000/${user.photo}`}
              alt="Profile"
              className="rounded-full object-cover w-16 h-16"
            />
            <div className="flex flex-col text-lg text-[#566a7f]">
              <p>{user.name}</p>
              <p className="text-gray-400">
                {user.role
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">{error || "Loading..."}</p>
        )}
      </div>
    </div>
  );
}
