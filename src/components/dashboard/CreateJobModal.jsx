/* eslint-disable react/prop-types */

import axios from "axios";
import { InputsVariants } from "../../../ui/InputsVariants";
import { useState } from "react";

export default function CreateJobModal({ modal, startUp, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleApplyClick = async () => {
    const token = localStorage.getItem("token");

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Create the job
      const createJob = await axios.post(
        "http://127.0.0.1:3000/api/v1/jobs",
        {
          companyId: startUp,
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createJob);
      // Send application

      setTitle("");
      setDescription("");

      alert("Job created successfully!");
      onClose();
    } catch (error) {
      console.error("Error create job:", error);
      alert("Failed to create. Please try again.");
    }
  };

  if (!modal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        {/* Job Details */}
        <div className="flex flex-col gap-y-2">
          <h2 className="text-2xl font-bold text-[#566A7F]">CREATE JOB</h2>
          <h3 className="text-lg text-[#566a7fab]">Create new job</h3>

          <div className="flex flex-col gap-y-4">
            <InputsVariants
              type="text"
              label="Job Name"
              placeholder="Job Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Textarea for Description */}
            <textarea
              name="description"
              id="description"
              placeholder="Write a short description about the job offer"
              className="w-full h-[196px] border border-[#D3D3FF] rounded-md px-3 py-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={handleApplyClick}
            className="bg-[#696cff] text-white px-6 py-2 rounded-lg mt-4 w-full hover:scale-105 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
