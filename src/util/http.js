import axios from "axios";

export const fetchUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("http://127.0.0.1:3000/api/v1/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = new Error("Failed to fetch users");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = response.data;

  return data;
};
