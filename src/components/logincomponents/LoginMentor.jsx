import { useNavigate } from "react-router";
import { logomentorImg } from "../../assets/data/logo";
import { InputsVariants } from "../../../ui/InputsVariants";
import { useState } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function LoginMentor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      let message = "";
      if (!email) message += "Email is required. ";
      if (!password) message += "Password is required.";
      setErrorMessage(message);
      return;
    }

    setErrorMessage("");

    try {
      const loginData = await fetch(
        "http://localhost:3000/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await loginData?.json();
      if (data?.status === "success") {
        localStorage.setItem("token", data?.token);
        setEmail("");
        setPassword("");
        if (data?.data.user.role === "mentor") {
          navigate("/dashboard/mentor");
        } else if (data?.data.user.role === "startup") {
          navigate("/dashboard/startup");
        }
      } else {
        setErrorMessage("Email or password is incorrect.");
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col items-start justify-start gap-y-8 bg-white lg:w-3/5 w-full h-screen lg:rounded-l-3xl pt-20 px-10 lg:px-52">
      <div className="flex flex-col justify-start items-start gap-y-10">
        <img src={logomentorImg} alt="Token" className="w-[49px] h-[59.44px]" />
        <div className="flex flex-col font-semibold items-start justify-center text-3xl gap-y-4 text-[#566a7f]">
          <h1 className="uppercase">Log in to mentor token</h1>
          <p className="text-sm font-thin text-gray-400">
            Enter your email and pass to login.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-6">
        <InputsVariants
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="space-y-2 w-full">
          <InputsVariants
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <p
            onClick={() => setModal(true)}
            className="text-[#696cff] hover:text-[#703796] cursor-pointer"
          >
            Forgot password?
          </p>
        </div>
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="flex flex-col justify-center items-center w-full gap-y-6">
        <button
          onClick={() => handleLogin()}
          className="text-white bg-[#696cff] px-4 py-2 w-full rounded-md hover:bg-opacity-90 transition-all hover:scale-105"
        >
          Log In
        </button>
        <p className="text-[#566a7f] space-x-1">
          <span>Don&apos;t have an account?</span>

          <span
            onClick={() => navigate("/signup")}
            className="text-[#696cff] hover:cursor-pointer hover:text-[#703796]"
          >
            Register.
          </span>
        </p>
      </div>
      {modal && (
        <ForgotPasswordModal modal={modal} onClose={() => setModal(false)} />
      )}
    </div>
  );
}
