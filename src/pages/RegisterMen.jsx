import Growstartup from "../components/logincomponents/Growstartup";
import RegisterMentor from "../components/logincomponents/RegisterMentor";

export default function RegisterMen() {
  return (
    <div
      className="flex lg:flex-row flex-col  justify-between items-center w-full
              h-screen
              relative
              overflow-hidden
              z-[10] bg-gradient-to-b from-[#7073fd] via-[#7073fd] to-[#947afe] before:content-[''] before:absolute before:inset-0 before:block before:bg-[url(/images/vectary-texture.png)] before:opacity-100 before:z-[-5]"
    >
      <Growstartup />
      <RegisterMentor />
    </div>
  );
}
