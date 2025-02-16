import { InputsVariants } from "../../../ui/InputsVariants";
import { logomentorImg } from "../../assets/data/logo";
import { uploadIcon } from "../../assets/data/icons";
import { photoIcon } from "../../assets/data/icons";
import { Checkbox } from "@material-tailwind/react";

export default function RegisterStartUp() {
  return (
    <div className="flex flex-col items-start justify-start gap-y-6 bg-white lg:w-3/5 w-full h-screen  lg:rounded-l-3xl py-10  px-10 lg:px-60  ">
      <div className="flex flex-col justify-start items-start gap-y-4 ">
        <img src={logomentorImg} alt="Token" className="w-[49px] h-[59.44px]" />
        <div className="flex flex-col font-semibold items-start justify-center text-3xl gap-y-2 text-[#566a7f]">
          <h1 className="uppercase">Setup startup account</h1>
        </div>
      </div>
      <div className="flex items-center  w-full relative">
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
        <InputsVariants label="My Startup Name" placeholder="My Startup Name" />
        <div className="flex-flex-col space-y-1 text-[#566a7f] text-md ">
          <p>
            Legal Representative <span className="text-red-400">*</span>
          </p>
          <InputsVariants
            label="Name and surname"
            placeholder="Name and surname"
          />
        </div>
        <div className="flex-flex-col space-y-1 text-[#566a7f] text-md ">
          <p>
            Requested Business Adress <span className="text-red-400">*</span>
          </p>
          <InputsVariants
            label="Requested Business Adress"
            placeholder="Requested Business Adress"
          />
        </div>
        <div className="flex-flex-col space-y-1 text-[#566a7f] text-md ">
          <p>
            Invite Mentors via email <span className="text-red-400">*</span>
          </p>
          <InputsVariants
            label="Enter email adress to invite mentor"
            placeholder="Enter email adress to invite mentor"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center w-full gap-y-2">
        <button className="text-white  bg-[#696cff] px-4 py-2 w-full rounded-md hover:bg-opacity-90 easy-in-out transition-all easy-in-out hover:scale-105">
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
