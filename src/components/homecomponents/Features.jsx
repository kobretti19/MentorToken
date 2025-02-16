import { FEATURES } from "../../assets/data/fetures-data";
import { rocketBigLogo } from "../../assets/data/logo";

export default function Features() {
  return (
    <div className="flex flex-col items-center justify-between font-thin tracking-wide gap-y-10 h-auto py-24 rounded-xl  bg-gradient-to-br from-[#696cff] to-[#9574ff]  rounden-xl  text-white  relative ">
      <div className="flex flex-col items-center justify-center font-semibold lg:w-2/5  gap-y-6">
        <p className="lg:text-lg text-xl tracking-widest">FEATURES</p>
        <h1 className="text-3xl w-[88%] font-thin lg:text-4xl text-center">
          Boost Your Startup&apos;s Journey: Discover Mentor Token&apos;s Robust
          Features
        </h1>
      </div>
      <div className="flex flex-row rounded-xl items-center justify-around flex-wrap gap-4  bg-transparent  w-[90%] mx-auto">
        {FEATURES.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-start justify-around inset-ring w-[298px] h-[259px] p-8 py-6 gap-4 shadow-indigo-900/50 shadow-2xl rounded-xl"
          >
            <div className="flex flex-col justify-between space-y-8">
              <img src={feature.logo} alt={feature.title} className="w-6 h-6" />
              <h2 className="font-semibold text-lg">{feature.title}</h2>
            </div>

            <p>{feature.usage}</p>
          </div>
        ))}
        <img
          src={rocketBigLogo}
          alt="Rocket image"
          className="absolute lg:-top-80 lg:right-0 md:-top-72 -top-44 -right-20"
        />
      </div>
    </div>
  );
}
