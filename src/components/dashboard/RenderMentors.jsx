/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { inIcon } from "../../assets/data/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch } from "../../app/searchQuery";

export default function RenderMentors({ data }) {
  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery =
    useSelector((state) => state.searchQuery.searchUser) || "";

  const filteredMentors = data?.filter((user) =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (user) => {
    if (searchQuery) {
      dispatch(clearSearch());
    }
    navigate(`/dashboard/mentors/${user}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full md:w-[70%] lg:w-[58%] mt-10">
      {filteredMentors.length > 0 ? (
        filteredMentors.map((user) => {
          const rating = getRandomRating();
          const averageScore = (rating + Math.random() * (3 - 2)).toFixed(2);
          const imageUrl = user?.photo
            ? `http://127.0.0.1:3000/${user.photo}`
            : `http://127.0.0.1:3000/default.jpeg`;

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
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
              </div>

              {/* Mentor Details */}
              <div className="flex flex-col w-full">
                {/* Name and LinkedIn Icon */}
                <div className="flex flex-row justify-start items-center space-x-2">
                  <p className="font-semibold text-lg text-[#4c5057]">
                    {user?.name}
                  </p>
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
                  <span className="font-semibold">Skills:</span>{" "}
                  {Array.isArray(user?.skills) && user.skills.length > 0
                    ? user.skills[0]
                        .split(",")
                        .map((skill) => skill.trim())
                        .join(" | ")
                    : "N/A"}
                </p>

                {/* Bio */}
                <p className="text-sm text-gray-700 mt-1 line-clamp-2 w-[70%]">
                  {user?.bio}
                </p>
              </div>

              {/* View Mentor Button */}
              <div className="ml-auto">
                <button
                  onClick={() => handleNavigate(user?._id)}
                  className="text-white bg-[#696cff] px-4 py-2 w-[140px] rounded-md hover:scale-105 hover:bg-[#5d5fd6] transition-all ease-in-out duration-200"
                >
                  View Mentor
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">No mentors found</p>
      )}
    </div>
  );
}
