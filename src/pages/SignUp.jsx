import Growstartup from "../components/logincomponents/Growstartup";
import Register from "../components/logincomponents/Register";

export default function SignUp() {
  return (
    <div
      className="flex lg:flex-row flex-col  justify-between items-center w-full
              h-screen
              relative
              overflow-hidden
              z-[10] bg-gradient-to-b from-indigo-600 to-violet-500 before:content-[''] before:absolute before:inset-0 before:block before:bg-[url(/images/vectary-texture.png)] before:opacity-100 before:z-[-5]"
    >
      <Growstartup />
      <Register />
    </div>
  );
}
