import { inIcon, mailIcon, phoneIcon, plusIcon } from "../../assets/data/icons";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchToken from "../../hooks/useFetchToken";
import OfferJobModalComponent from "../../components/dashboard/OfferJobModal";
import PendingJobOffersComponent from "../../components/dashboard/PendingJobOffers";
import NavbarDashboard from "../../components/dashboard/NavbarDashboard";
import { handleMentorData } from "../../app/AuthProvider";
import PendingJobsStartUp from "../../components/dashboard/PendingJobsStartUp";

export default function ProfileMentor() {
  const [startUpId, setStartUpId] = useState(null);
  const [selectedMentorId, setSelectedMentorId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const mentorId = params.user;
  const token = localStorage.getItem("token");

  const startUpData = useSelector((state) => state.createUser.data);
  const dispatch = useDispatch();

  // Fetch mentor details
  const {
    data: mentorData,
    error,
    loading,
  } = useFetchToken(`http://127.0.0.1:3000/api/v1/users/${mentorId}`, token);

  // Fetch assignments
  const { data: assignmentsData } = useFetchToken(
    `http://127.0.0.1:3000/api/v1/assignments/user/noreject/${mentorId}`,
    token
  );
  const assignments = assignmentsData || [];

  useEffect(() => {
    if (mentorData) {
      dispatch(handleMentorData(mentorData));
    }
  }, [mentorData, dispatch]);

  const handleOfferClick = () => {
    setSelectedMentorId(mentorData?.data?.data?._id);
    setStartUpId(startUpData?._id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        Error: {error?.message || "Something went wrong"}
      </div>
    );
  }

  const mentor = mentorData?.data?.data;

  return (
    <div className="flex flex-col items-start gap-6 w-[90%] mt-10 mb-10 h-screen">
      <div className="flex flex-col md:flex-row justify-start gap-6 w-full h-auto">
        {/* Profile Card */}
        <div className="flex flex-col items-start gap-3 py-6 px-5 shadow-md bg-white rounded-xl text-gray-700 w-[233px]">
          {/* Profile Image */}
          <div className="flex flex-col items-center w-full">
            <img
              src={
                mentor?.photo
                  ? `http://127.0.0.1:3000/${mentor.photo}`
                  : "/default-profile.png"
              }
              alt="Profile"
              className="rounded-full object-cover w-24 h-24 border-2 border-[#696cff]"
            />
          </div>

          {/* Name & Role */}
          <div className="">
            <p className="text-xl font-semibold flex items-center gap-2">
              {mentor?.name || "Unknown"}
              <img src={inIcon} alt="LinkedIn Icon" className="w-5 h-5" />
            </p>
            <p className="text-[#696cff] text-sm">Sales Representative</p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2 text-sm text-[#8aa4be]">
              <img src={mailIcon} alt="Mail Icon" className="w-5 h-5" />
              <p>{mentor?.email || "No email available"}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#8aa4be]">
              <img src={phoneIcon} alt="Phone Icon" className="w-5 h-5" />
              <p>{mentor?.phone || "No phone available"}</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="relative flex flex-col px-6 py-5 rounded-xl bg-white w-full md:w-3/4 shadow-md">
          <h1 className="text-[#696cff] font-semibold text-lg">About</h1>

          {/* Skills */}
          <div className="flex items-center gap-2 mt-3">
            <h1 className="font-semibold">Skills:</h1>
            <p className="text-gray-800 flex flex-row gap-x-2">
              {mentor?.skills.map((skill, i) => (
                <p key={i}>
                  <span>{skill}</span>
                  {i !== mentor?.skills.length - 1 ? <span> |</span> : ""}
                </p>
              )) || "No skills listed"}
            </p>
          </div>

          {/* Bio */}
          <div className="mt-3">
            <p className="text-sm text-gray-700">
              {mentor?.bio || "No bio available"}
            </p>
          </div>

          {/* Offer Job Button */}
          <button
            onClick={handleOfferClick}
            className="absolute top-5 right-5 flex flex-row items-center justify-center gap-x-1 px-3 py-2 text-white bg-[#696CFF] rounded-xl hover:scale-105 hover:bg-[#696cffdf] transition"
          >
            <img src={plusIcon} alt="Add Icon" className="w-4 h-4" />
            <span>Offer New Job</span>
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-start gap-x-10 w-[100%] h-[65vh] my-10">
        <div className="w-1/2 overflow-y-auto">
          <NavbarDashboard assignments={assignments} />
        </div>
        <div className="flex flex-col gap-y-6 ">
          <PendingJobOffersComponent />
          <PendingJobsStartUp mentorId={mentorId} />
        </div>
      </div>

      {isModalOpen && (
        <OfferJobModalComponent
          mentor={selectedMentorId}
          startUp={startUpId}
          modal={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
