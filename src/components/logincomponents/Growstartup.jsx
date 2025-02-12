import { mentorTokenWhite } from "../../assets/data/logo";
import { rocketBigLogo } from "../../assets/data/logo";

export default function Growstartup() {
  return (
    <div className="flex flex-col justify-between items-center h-full lg:w-1/3 w-full pt-20 pb-5 ">
      <div className="flex flex-col  lg:items-start items-center justify-center text-white  ">
        <h1 className="lg:text-7xl text-3xl relative font-semibold tracking-wide ">
          GROW <br /> YOUR <br /> STARTUP!
        </h1>
        <p className="uppercase">Monitoring and evaluating now is easy!</p>
      </div>
      <div className="lg:-ml-32">
        <img
          src={mentorTokenWhite}
          alt="Logo Mentor Token"
          className="w-[241px] h-[83px]"
        />
        <img
          src={rocketBigLogo}
          alt="Rocket Image"
          className="absolute lg:left-[14%] top-[16%] hidden lg:block"
        />
      </div>
    </div>
  );
}
