import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Profile from "./Profile";

export default function ViewMentor() {
  const [usersData, setUsersData] = useState(null);
  const params = useParams();
  const userId = params.user;

  console.log(usersData);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsersData(response?.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="mt-6">
      {usersData ? (
        <Profile key={userId} userData={usersData?.data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
