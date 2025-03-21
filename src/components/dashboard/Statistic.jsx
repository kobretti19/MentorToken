import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatisticComponent() {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.createUser.data);

  useEffect(() => {
    if (!userData?._id) return;

    let isMounted = true;

    axios
      .get(`http://localhost:3000/api/v1/assignments/user/${userData._id}`)
      .then((response) => {
        if (!isMounted) return;

        const jobs = response.data;
        const filteredJobs = jobs.filter((job) => job.status !== "rejected");

        const monthlyStats = Array(12).fill(0);
        filteredJobs.forEach((job) => {
          const month = new Date(job.createdAt).getMonth();
          monthlyStats[month] += 1;
        });

        const chartData = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((month, index) => ({
          month,
          jobsCount: monthlyStats[index],
        }));

        setData(chartData);
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      isMounted = false;
    };
  }, [userData?._id]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <h3 className="text-gray-800 text-md tracking-wide">STATISTICS</h3>
      <p className="text-gray-500 text-sm mb-4">
        Overall target accomplishment over the year
      </p>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="jobsCount"
              stroke="#6366f1"
              fill="#c7d2fe"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
