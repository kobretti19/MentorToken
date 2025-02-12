import { useNavigate } from "react-router";
import { logomentorImg } from "../../assets/data/logo";

export default function LoginMentor() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-start gap-y-8 bg-white lg:w-3/5 w-full h-screen lg:rounded-l-3xl pt-20 px-10 lg:px-48  ">
      <div className="flex flex-col justify-start items-start gap-y-10 ">
        <img src={logomentorImg} alt="Token" className="w-[49px] h-[59.44px]" />
        <div className="flex flex-col font-semibold items-start justify-center text-3xl gap-y-4 text-[#566a7f]">
          <h1 className="uppercase">Log in to mentor token </h1>
          <p className="text-sm font-thin">
            Enter your email and pass to login.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-5">
        <Input type="text" placeholder="Email" />
        <div className="space-y-2 w-full">
          <Input type="text" placeholder="Password" />
          <p className="text-[#696cff] hover:text-[#703796] cursor-pointer">
            Forgot password?
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center w-full gap-y-6">
        <button className="text-white  bg-[#696cff] px-4 py-2 w-full rounded-md hover:bg-opacity-90 easy-in-out transition-all easy-in-out hover:scale-105">
          Log In
        </button>
        <p className="text-[#566a7f]">
          Dont&apos;t have account?
          <span
            onClick={() => navigate("/signup")}
            className="text-[#696cff] hover:cursor-pointer hover:text-[#703796] "
          >
            {" "}
            Register.
          </span>
        </p>
      </div>
    </div>
  );
}

const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="px-4 py-3 text-xs rounded-md w-full  border border-[#696cff] focus:outline-none focus:shadow-xl  text-[#566a7f]"
    />
  );
};
