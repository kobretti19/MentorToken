/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { inIcon } from "../../assets/data/icons";

export default function RenderMentors({ data }) {
  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full md:w-[70%] lg:w-[55%] mt-10">
      {data?.map((user) => {
        const rating = getRandomRating();
        const averageScore = (rating + Math.random() * (3 - 2)).toFixed(2);
        const imageUrl = user?.photo
          ? `http://127.0.0.1:3000/${user.photo}`
          : "/fallback.jpg"; // Provide a fallback image

        return (
          <div
            key={user._id}
            className="flex flex-row h-auto gap-x-4 bg-white px-6 py-5 rounded-xl shadow-md items-center"
          >
            {/* Profile Image */}
            <div className="flex flex-row items-center min-w-[80px]">
              <img
                src={imageUrl}
                alt="Profile"
                className="rounded-full w-20 h-20 object-cover aspect-square border border-gray-300"
                onError={(e) => (e.target.src = "/fallback.jpg")} // If image fails to load, show fallback
              />
            </div>

            {/* Mentor Details */}
            <div className="flex flex-col w-full">
              {/* Name and LinkedIn Icon */}
              <div className="flex flex-row justify-start items-center space-x-2">
                <p className="font-semibold text-lg">{user?.name}</p>
                <img src={inIcon} alt="LinkedIn Icon" className="w-5 h-5" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-x-2 mt-1">
                {Array.from({ length: rating }, (_, index) => (
                  <span key={index} className="text-[#696cff] text-lg">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - rating }, (_, index) => (
                  <span
                    key={index}
                    className="text-transparent text-lg"
                    style={{ WebkitTextStroke: "1px #696cff" }}
                  >
                    ★
                  </span>
                ))}
                <span className="text-gray-700 text-sm ml-2">
                  {averageScore} avg based on KPI success rate
                </span>
              </div>

              {/* Skills */}
              <p className="text-md text-black mt-1">
                <span className="font-semibold">Skills:</span> {user?.skills}
              </p>

              {/* Bio */}
              <p className="text-sm text-gray-700 mt-1 line-clamp-2 w-[70%]">
                {user?.bio}
              </p>
            </div>

            {/* View Mentor Button */}
            <div className="ml-auto">
              <button
                onClick={() => navigate(`/dashboard/mentors/${user._id}`)}
                className="text-white text-sm bg-[#696cff] px-5 py-2 w-[150px] rounded-md hover:scale-105 hover:bg-[#5d5fd6] transition-all ease-in-out duration-200"
              >
                View Mentor
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
