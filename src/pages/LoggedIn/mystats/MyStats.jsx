import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  editIcon,
  inIcon,
  mailIcon,
  phoneIcon,
} from "../../../assets/data/icons";
import StatisticComponent from "../../../components/dashboard/Statistic";
import OverviewComponent from "../../../components/dashboard/Overview";

export default function MyStats() {
  const userData = useSelector((state) => state.createUser.data);

  const [name, setName] = useState(userData?.name || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState(userData?.bio || "");
  const [skills, setSkills] = useState(userData?.skills?.join(" | ") || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  console.log(userData, "userData");

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("skills", skills.split(" | "));

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/updateMe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated");
      console.log("Profile updated:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="flex flex-col w-full items-start gap-6 mt-10 ">
      <h2 className="font-semibold text-xl text-[#404D61]">My Stats</h2>

      <div className="flex flex-row justify-start gap-6 w-[100%] h-auto ">
        {/* Profile Card */}
        <div className="flex flex-col items-start gap-2 py-6 px-5 shadow-md bg-white rounded-xl text-md> text-gray-700 w-1/6">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <img
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : `http://127.0.0.1:3000/${userData?.photo}`
                }
                alt="Profile"
                className="rounded-full object-cover w-20 h-20"
              />
            </label>
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 rounded-md w-full"
              />
            ) : (
              <p className="flex flex-row text-xl gap-2 font-semibold">
                {name}
                <span>
                  <img src={inIcon} alt="LinkedIn Icon" />
                </span>
              </p>
            )}
            <p className="text-[#696cff]">Sales Representative</p>
          </div>

          <div className="flex flex-row font-extralight text-sm items-center gap-2">
            <img src={mailIcon} alt="Mail Icon" />
            <p className="text-[#8aa4be] ">{userData?.email}</p>
          </div>

          <div className="flex flex-row text-[#8aa4be] text-sm justify-between gap-2">
            <img src={phoneIcon} alt="Phone Icon" />
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-1 rounded-md w-full"
              />
            ) : (
              <p>{phone}</p>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="relative flex flex-col px-6 py-4 rounded-xl bg-white w-[70%] shadow-md ">
          <h1 className="text-[#696cff] font-semibold">About</h1>
          <div className="flex flex-row items-center gap-2 mt-2">
            <h1 className="font-semibold">Skills:</h1>
            {isEditing ? (
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="border p-1 rounded-md w-full"
              />
            ) : (
              <p>{skills}</p>
            )}
          </div>
          <div className="mt-4">
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border p-2 rounded-md w-full h-24"
              />
            ) : (
              <p className="text-sm overflow-y-auto">{bio}</p>
            )}
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-5 right-5"
          >
            <img src={editIcon} alt="Edit Icon" />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start h-1/3 w-full gap-6">
        <div className="w-2/4 ">
          <h2 className="font-semibold text-xl text-[#404D61] mb-6">
            Performance Over Time
          </h2>
          <div className="bg-white rounded-xl h-64">
            <StatisticComponent />
          </div>
        </div>
        <div className="w-1/3">
          <h2 className="font-semibold text-xl text-[#404D61] mb-2">
            Quick Overview
          </h2>
          <div className="bg-white h-96 ">
            <OverviewComponent />
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-[#696cff] text-white rounded-lg"
        >
          Save Changes
        </button>
      )}
    </div>
  );
}
