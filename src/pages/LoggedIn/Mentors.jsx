import { useEffect, useState } from "react";
import QuickOverview from "../../components/dashboard/QuickOverview";
import RenderMentors from "../../components/dashboard/RenderMentors";
import axios from "axios";

export default function Mentors() {
  const [users, setUsers] = useState([]);

  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:3000/api/v1/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredMentors = response?.data.filter(
        (user) => user.role !== "startup"
      );

      setUsers(filteredMentors);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-row lg:justify-start w-full gap-10 items-start mt-10">
      <RenderMentors data={users} key={users} />
      <QuickOverview />
    </div>
  );
}
