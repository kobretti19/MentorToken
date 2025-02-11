import { screeshootImg } from "../../assets/data/logo";
import { clockImg } from "../../assets/data/logo";

export default function Screenshoot() {
  return (
    <div className="flex-flex-col  font-thin relative px-10">
      <h1 className="text-3xl lg:w-full w-56  px-2 pb-10 font-semibold tracking-wide">
        Every <span className="text-[#696cff] font-bold">success</span> is
        rewarded!
      </h1>
      <div className="border-4 border-[#696cff] rounded-3xl  p-4">
        <img src={screeshootImg} alt="" className="w-full h-full " />
      </div>
      <div className="absolute lg:-top-20  top-4 lg:right-52 -right-10  lg:w-3/12 w-52">
        <img src={clockImg} alt="Image with Clock Tasks" />
      </div>
    </div>
  );
}
