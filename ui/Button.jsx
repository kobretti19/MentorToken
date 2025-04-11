/* eslint-disable react/prop-types */
export default function Button({ btnText, ...props }) {
  return (
    <button
      className="text-white flex justify-around gap-4 items-center bg-[#696cff] px-3 rounded-md py-2 hover:scale-110 hover:bg-[#5d5fd6] transition-all easy-in-out"
      {...props}
    >
      {btnText}
    </button>
  );
}
