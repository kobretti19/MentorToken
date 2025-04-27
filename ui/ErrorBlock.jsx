/* eslint-disable react/prop-types */
export default function ErrorBlock({ title, message }) {
  return (
    <div className="bg-[ #f0d9e5] m-[1rem] p-[1rem] border-2 text-[#890b35] flex gap-[2rem] items-center text-left">
      <div className="text-[2rem] w-[3rem] h-[3rem] text-[#fff] bg-[#890b35] br-[50%] flex justify-center items-center">
        !
      </div>
      <div className="text-inherit text-[1.25rem] m-0">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
