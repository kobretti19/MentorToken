/* eslint-disable react/prop-types */
import axios from "axios";
import { InputsVariants } from "../../../ui/InputsVariants";
import { useState } from "react";

export default function OfferJobModalComponent({
  mentor,
  startUp,
  onClose,
  modal,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApplyClick = async () => {
    const token = localStorage.getItem("token");

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Create the job
      const { data: job } = await axios.post(
        "http://127.0.0.1:3000/api/v1/jobs",
        {
          companyId: startUp,
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await axios.post(
        "http://127.0.0.1:3000/api/v1/assignments",
        {
          jobId: job._id,
          companyId: startUp,
          mentorId: mentor,
          applicationType: "companyToMentor",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error offering job:", error);
      alert("Failed to send job offer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!modal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          title="Close"
        >
          ✕
        </button>

        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold text-[#566A7F]">Offer Job</h2>
          <h3 className="text-lg text-[#566a7fab]">
            Create and offer a job to a mentor
          </h3>

          <div className="flex flex-col gap-y-4 mt-4">
            <InputsVariants
              type="text"
              label="Job Name"
              placeholder="Job Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              name="description"
              placeholder="Write a short description about the job offer"
              className="w-full h-[196px] border border-[#D3D3FF] rounded-md px-3 py-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            onClick={handleApplyClick}
            disabled={loading}
            className={`bg-[#696cff] text-white px-6 py-2 rounded-lg mt-4 w-full transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {loading ? "Sending..." : "Send Job Offer"}
          </button>
        </div>
      </div>
    </div>
  );
}
