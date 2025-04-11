import { InputsVariants } from "../../../ui/InputsVariants";
import { logomentorImg } from "../../assets/data/logo";
import { uploadIcon } from "../../assets/data/icons";
import { photoIcon } from "../../assets/data/icons";
import { Checkbox } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios"; // Import axios

export default function RegisterStartUp() {
  const [startUpName, setStartUpName] = useState("");
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");

  const email = useSelector((state) => state.createUser.email);
  const password = useSelector((state) => state.createUser.password);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default behavior in case it's inside a form

    if (!email || !password || !name || !startUpName || !adress) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        {
          email,
          password,
          name,
          startUpName,
          adress,
          role: "startup",
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.data?.status === "success") {
        alert("Account created successfully");
        navigate("/login");
      } else {
        alert(response.data?.message || "Registration failed.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-y-6 bg-white lg:w-3/5 w-full h-screen lg:rounded-l-3xl py-10 px-10 lg:px-60">
      <div className="flex flex-col justify-start items-start gap-y-4">
        <img src={logomentorImg} alt="Token" className="w-[49px] h-[59.44px]" />
        <div className="flex flex-col font-semibold items-start justify-center text-3xl gap-y-2 text-[#566a7f]">
          <h1 className="uppercase">Setup startup account</h1>
        </div>
      </div>
      <div className="flex items-center w-full relative">
        <img
          src={uploadIcon}
          alt="Upload Icon"
          className="w-[121.76px] h-[121.76px] mx-auto"
        />
        <img
          src={photoIcon}
          alt="Photo icon"
          className="absolute -top-2 right-60"
        />
      </div>

      <div className="w-full flex flex-col gap-y-6 text-[#566a7f]">
        <InputsVariants
          onChange={(e) => setStartUpName(e.target.value)}
          label="My Startup Name"
          value={startUpName}
          placeholder="My Startup Name"
          required
        />
        <div className="flex-flex-col space-y-1 text-[#566a7f] text-md ">
          <p>
            Legal Representative <span className="text-red-400">*</span>
          </p>
          <InputsVariants
            onChange={(e) => setName(e.target.value)}
            label="Name and surname"
            value={name}
            placeholder="Name and surname"
            required
          />
        </div>
        <div className="flex-flex-col space-y-1 text-[#566a7f] text-md ">
          <p>
            Requested Business Address <span className="text-red-400">*</span>
          </p>
          <InputsVariants
            onChange={(e) => setAdress(e.target.value)}
            label="Requested Business Address"
            value={adress}
            placeholder="Requested Business Address"
            required
          />
        </div>
        <div className="flex-flex-col space-y-1 text-[#566a7f] text-md ">
          <p>
            Invite Mentors via email <span className="text-red-400">*</span>
          </p>
          <InputsVariants
            label="Enter email address to invite mentor"
            placeholder="Enter email address to invite mentor"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-y-2">
        <button
          onClick={handleSubmit} // Ensure this is calling the function
          className="text-white bg-[#696cff] px-4 py-2 w-full rounded-md hover:bg-opacity-90 easy-in-out transition-all easy-in-out hover:scale-105"
        >
          Register
        </button>
        <div className="flex items-center justify-start gap-x-4 w-full">
          <Checkbox color="indigo" className="w-[14px] h-[14px] rounded-none" />
          <p className="text-[#566a7f] text-xs">
            By signing up to create an account I accept Company&apos;s
            <span className="text-[#696cff]">
              Terms of use & Privacy Policy.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
