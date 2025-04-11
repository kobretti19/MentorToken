import { useNavigate } from "react-router";
import { logomentorImg } from "../../assets/data/logo";
import { checkIcon } from "../../assets/data/icons";
import { InputsVariants } from "../../../ui/InputsVariants";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeEmail,
  handleChangePassword,
} from "../../app/AuthProvider";

export default function Register() {
  const [isStartupClicked, setIsStartupClicked] = useState(true);
  const [isMentorClicked, setIsMentorClicked] = useState(false);
  const [error, setError] = useState("");

  const email = useSelector((state) => state.createUser.email);
  const password = useSelector((state) => state.createUser.password);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLongEnough = password.length >= 8;
  const containsSymbolOrNumber = /[\d!@#$%^&*(),.?":{}|<>]/.test(password);
  const doesNotContainEmail = email && !password.includes(email);

  let passwordStrength = "Weak ❌";
  if (isLongEnough && containsSymbolOrNumber && doesNotContainEmail) {
    passwordStrength = "Strong ✅";
  } else if (isLongEnough && (containsSymbolOrNumber || doesNotContainEmail)) {
    passwordStrength = "Medium ⚠️";
  }

  const isPasswordValid =
    isLongEnough && containsSymbolOrNumber && doesNotContainEmail;

  const handleSubmit = () => {
    if (!email || !password) {
      setError("⚠️ Email and Password are required.");
      return;
    }
    if (!isPasswordValid) {
      setError("⚠️ Your password must meet all requirements.");
      return;
    }

    setError(""); // Clear error on success

    if (isStartupClicked) {
      navigate("/signup/registerstartup");
    } else {
      navigate("/signup/registermentor");
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-y-8 bg-white lg:w-3/5 w-full h-screen lg:rounded-l-3xl pt-20 px-10 lg:px-52 py-20">
      <div className="flex flex-col justify-start items-start gap-y-10">
        <img src={logomentorImg} alt="Token" className="w-[49px] h-[59.44px]" />
        <h1 className="uppercase font-semibold text-3xl text-[#566a7f]">
          Choose Account Type
        </h1>
      </div>

      {/* Account Type Selection */}
      <div className="flex flex-row justify-center items-center text-sm w-full bg-stone-100 rounded-r-md">
        <button
          onClick={() => {
            setIsStartupClicked(true);
            setIsMentorClicked(false);
          }}
          className={`${
            isStartupClicked
              ? "bg-[#696cff] text-white"
              : "bg-white text-[#566a7f]"
          } px-2 py-2 w-full rounded-md hover:bg-opacity-90 transition-all hover:scale-105`}
        >
          Startup
        </button>
        <button
          onClick={() => {
            setIsMentorClicked(true);
            setIsStartupClicked(false);
          }}
          className={`${
            isMentorClicked
              ? "bg-[#696cff] text-white"
              : "bg-white text-[#566a7f]"
          } px-2 py-2 w-full hover:bg-opacity-90 transition-all hover:scale-110`}
        >
          Mentor
        </button>
      </div>

      {/* Input Fields */}
      <div className="w-full flex flex-col gap-y-6">
        <InputsVariants
          value={email}
          onChange={(e) => {
            dispatch(handleChangeEmail(e.target.value));
            setError("");
          }}
          label="Email"
          placeholder="Email"
        />
        <InputsVariants
          type="password"
          value={password}
          onChange={(e) => {
            dispatch(handleChangePassword(e.target.value));
            setError("");
          }}
          label="Password"
          placeholder="Password"
        />

        {/* Password Strength & Rules */}
        <div className="flex flex-col items-start text-xs gap-y-2 tracking-wide">
          <p className="font-semibold">
            Password Strength:{" "}
            <span
              className={`${
                isPasswordValid ? "text-green-500" : "text-red-500"
              }`}
            >
              {passwordStrength}
            </span>
          </p>
          <p
            className={`flex gap-x-1 ${
              isLongEnough ? "text-green-500" : "text-red-500"
            }`}
          >
            <img src={checkIcon} alt="" className="w-[16px] h-[16px]" />
            At least 8 characters
          </p>
          <p
            className={`flex gap-x-1 ${
              containsSymbolOrNumber ? "text-green-500" : "text-red-500"
            }`}
          >
            <img src={checkIcon} alt="" className="w-[16px] h-[16px]" />
            Contains a number or symbol
          </p>
          <p
            className={`flex gap-x-1 ${
              doesNotContainEmail ? "text-green-500" : "text-red-500"
            }`}
          >
            <img src={checkIcon} alt="" className="w-[16px] h-[16px]" />
            Cannot contain your email address
          </p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      </div>

      {/* Continue & Login Buttons */}
      <div className="flex flex-col justify-center items-center w-full gap-y-6">
        <button
          onClick={handleSubmit}
          disabled={!isPasswordValid}
          className={`px-4 py-2 w-full rounded-md transition-all hover:scale-105 ${
            isPasswordValid
              ? "bg-[#696cff] text-white hover:bg-opacity-90"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Continue
        </button>
        <p className="text-[#566a7f]">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#696cff] hover:cursor-pointer hover:text-[#703796]"
          >
            Login.
          </span>
        </p>
      </div>
    </div>
  );
}
