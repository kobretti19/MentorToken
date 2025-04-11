import GetStartedButton from "../../ui/GetStartedButton";
import { LOGOSABOUT, MENTORTEAM } from "../assets/data/team-profile";

export default function About() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-y-6 p-8 py-10 rounded-xl bg-[url(/images/background-laptop.png)] bg-cover bg-center">
        <h1 className="text-3xl font-bold tracking-wide">
          Meet our team members
        </h1>
        <p className="w-2/3 text-sm text-center tracking-wide">
          We focus on the details of everything we do. All to help businesses
          around the world focus on what&apos;s most important to them.
        </p>
        <GetStartedButton btnText="Get in touch" />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 p-6">
        {MENTORTEAM.map((person) => (
          <div
            key={person.id}
            className="flex flex-col items-center justify-center gap-y-4 w-72 p-6 px-10 bg-white shadow-lg rounded-lg"
          >
            <img
              src={person.image}
              alt={person.name}
              className="rounded-full w-24 h-24 object-cover"
            />
            <div className="text-center">
              <h1 className="font-semibold text-lg">{person.name}</h1>
              <h2 className="text-[#696cff] text-sm">{person.jobTitle}</h2>
            </div>
            <p className="text-stone-500 text-sm text-center">{person.info}</p>
            <div className="flex gap-3">
              {LOGOSABOUT.map((item, i) => (
                <img
                  key={i}
                  src={item.logo}
                  alt="Social Logo"
                  className="w-5 h-5"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
