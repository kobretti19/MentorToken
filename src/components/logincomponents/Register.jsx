import { useNavigate } from "react-router";
import { logomentorImg } from "../../assets/data/logo";
import { checkIcon } from "../../assets/data/icons";
import { InputsVariants } from "../../../ui/InputsVariants";
import { useState } from "react";

export default function Register() {
  const [isStartupClicked, setIsStartupClicked] = useState(true);
  const [isMentorClicked, setIsMentorClicked] = useState(false);

  const navigate = useNavigate();

  console.log(
    isStartupClicked,
    "----->isStartupClicked",
    isMentorClicked,
    "---->isMentorClicked"
  );

  const handleStartUp = () => {
    setIsStartupClicked(true);
    setIsMentorClicked(false);
  };
  const handleMentror = () => {
    setIsMentorClicked(true);
    setIsStartupClicked(false);
  };

  const handleSubmit = () => {
    if (isStartupClicked) {
      navigate("/signup/registerstartup");
    } else if (isMentorClicked) {
      navigate("/signup/registermentor");
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-y-8 bg-white lg:w-3/5 w-full h-screen lg:rounded-l-3xl pt-20 px-10 lg:px-52 py-20">
      <div className="flex flex-col justify-start items-start gap-y-10 ">
        <img src={logomentorImg} alt="Token" className="w-[49px] h-[59.44px]" />
        <div className="flex flex-col font-semibold items-start justify-center text-3xl gap-y-4 text-[#566a7f]">
          <h1 className="uppercase">Choose account Type </h1>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center text-sm w-full bg-stone-100 rounded-r-md">
        <button
          onClick={handleStartUp}
          className={` ${
            isStartupClicked
              ? "bg-[#696cff] text-white"
              : "bg-white  text-[#566a7f]"
          }   px-2 py-2 w-full rounded-md hover:bg-opacity-90 easy-in-out transition-all easy-in-out hover:scale-105`}
        >
          Startup
        </button>
        <button
          onClick={handleMentror}
          className={` ${
            isMentorClicked
              ? "bg-[#696cff] text-white rounded-md"
              : "bg-white  text-[#566a7f]"
          }   bg-tranparent px-2 py-2 w-full  hover:bg-opacity-90 easy-in-out transition-all easy-in-out hover:scale-110`}
        >
          Mentor
        </button>
      </div>

      <div className="w-full flex flex-col gap-y-6">
        <InputsVariants label="Email" placeholder="Email" />
        <div className="space-y-2 w-full">
          <InputsVariants label="Password" placeholder="Password" />
        </div>
        <div className="flex flex-col items-start justify-center  font-thin text-xs text-[#8ea3b9] gap-y-2 tracking-wide">
          <p className="flex gap-x-1">
            <span>
              <img src={checkIcon} alt="" className="w-[16px] h-[16px]" />
            </span>
            Password Strength : Weak
          </p>
          <p className="flex gap-x-1">
            <span>
              <img src={checkIcon} alt="" className="w-[16px] h-[16px]" />
            </span>
            Cannot contain your name or email address
          </p>
          <p className="flex gap-x-1">
            <span>
              <img src={checkIcon} alt="" className="w-[16px] h-[16px]" />
            </span>
            At least 8 characters
          </p>
          <p className="flex gap-x-1">
            <span>
              <img src={checkIcon} alt="" className="w-[16px] h-[16px]" />
            </span>
            Contains a number or symbol
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center w-full gap-y-6 ">
        <button
          onClick={handleSubmit}
          className="text-white  bg-[#696cff] px-4 py-2 w-full rounded-md hover:bg-opacity-90 easy-in-out transition-all easy-in-out hover:scale-105"
        >
          Continue
        </button>
        <p className="text-[#566a7f]">
          Already have account?
          <span
            onClick={() => navigate("/login")}
            className="text-[#696cff] hover:cursor-pointer hover:text-[#703796] "
          >
            Login.
          </span>
        </p>
      </div>
    </div>
  );
}
