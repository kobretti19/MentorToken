import { logomentorImg } from "../../assets/data/logo";
import MentorSidebar from "./MentorSidebar";
import { backIcon, logoutIcon } from "../../assets/data/icons";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import StartUpSidebar from "./StartUpSidebar";

export default function SidebarComponent() {
  const userData = useSelector((state) => state.createUser.data);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex flex-col sticky top-0 left-0  w-[250px] min-w-[250px] justify-between h-screen  py-12 px-4 bg-white ">
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-row items-center gap-2 px-2  w-full relative">
          <img src={logomentorImg} alt="Logo Image Token" />
          <h1 className="text-[24px] leading-tight-[35.52px] text-[#566A7F] font-[600] w-full">
            Mentor Token
          </h1>
          <img
            src={backIcon}
            alt="Back Icon"
            className="absolute -top-0 -right-10"
          />
        </div>
        <div className="flex flex-col gap-4 px-4 mt-6 tracking-wide">
          {userData?.role === "mentor" ? <MentorSidebar /> : <StartUpSidebar />}
        </div>
      </div>
      <div>
        <button
          onClick={handleLogOut}
          className="flex flex-row gap-2 pl-10 justify-center items-center text-[#696cff] "
        >
          <img src={logoutIcon} alt="LogOut Icon" />
          <span className="">Logout</span>
        </button>
      </div>
    </div>
  );
}
