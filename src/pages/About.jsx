import GetStartedButton from "../../ui/GetStartedButton";
import { LOGOSABOUT, MENTORTEAM } from "../assets/data/team-profile";

export default function About() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-y-6 p-8  py-10 rounded-xl bg-[url(/images/background-laptop.png)] ">
        <h1 className="text-3xl font-bold tracking-wide">
          Meet our team members
        </h1>
        <p className="w-2/3 text-sm text-center tracking-wide ">
          We Focus on the details of everything we do. All to help businesses
          around the world Focus on what&apos;s most important to them.
        </p>
        <GetStartedButton btnText="Get in touch" />
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center ">
        {MENTORTEAM.map((person) => (
          <div
            key={person.id}
            className="flex flex-col items-center justify-center gap-y-4 w-72  p-6 px-10"
          >
            <div>
              <img src={person.image} alt="Profile picture" />
            </div>
            <div className="text-center">
              <h1 className="font-semibold">{person.name}</h1>
              <h2 className="text-[#696cff]">{person.jobTitle}</h2>
            </div>
            <p className="text-stone-500 text-sm text-center">{person.info}</p>
            <div className="flex flex-row gap-3 text-black fill-black">
              {LOGOSABOUT.map((item, i) => (
                <img
                  key={i}
                  src={item.logo}
                  alt="Logo Social"
                  className="fill-black"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
