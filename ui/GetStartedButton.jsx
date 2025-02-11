/* eslint-disable react/prop-types */
import { IoArrowForwardSharp } from "react-icons/io5";

export default function GetStartedButton({ btnText }) {
  return (
    <div className="text-white flex justify-around gap-4 items-center bg-[#696cff] px-3 rounded-md py-2 hover:scale-110 hover:bg-[#5d5fd6] transition-all easy-in-out">
      <IoArrowForwardSharp />
      <button>{btnText}</button>
    </div>
  );
}
