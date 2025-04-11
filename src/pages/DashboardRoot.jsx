import { Outlet, useNavigate } from "react-router";
import SidebarComponent from "../components/dashboard/Sidebar";
import SearchBar from "../../ui/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleData } from "../app/AuthProvider";
import axios from "axios";
import RenderMentors from "../components/dashboard/RenderMentors";

export default function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersError, setUsersError] = useState("");

  const searchUser = useSelector((state) => state.searchQuery.searchUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found!");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/users/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data);
        setLoading(false);
      } catch (e) {
        setUsersError(e.message || "Error fetching users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please login.");
          setLoading(false);
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
          setError(errorData.message || "Error fetching user data.");
        }

        const data = await response.json();
        setUser(data);
        dispatch(handleData(data));
        setLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f9] min-h-screen pb-10">
      <div className="flex flex-row gap-10 relative mr-10">
        <SidebarComponent className="flex-none w-1/3" />
        <div className="w-full">
          <SearchBar />

          {searchUser ? (
            <RenderMentors data={users} />
          ) : (
            <Outlet key={user ? user._id : "no-user"} />
          )}
        </div>
      </div>

      {/* User Info Section */}
      <div
        onClick={() => navigate(`/dashboard/${user?._id}`)}
        className="absolute top-10 right-20 flex items-center gap-3"
      >
        {user ? (
          <>
            <img
              src={`http://127.0.0.1:3000/${user.photo || "default.jpg"}`} // Fallback if no photo
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

      {/* Display Users Fetch Error */}
      {usersError && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4">
          <p>{usersError}</p>
        </div>
      )}

      {/* Display User Fetch Error */}
      {error && !usersError && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
