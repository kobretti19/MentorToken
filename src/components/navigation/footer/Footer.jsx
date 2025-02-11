import { Link } from "react-router";
import { SOCIALLOGOS } from "../../../assets/data/footer";
import { mentorLogo } from "../../../assets/data/footer";

export default function Footer() {
  return (
    <div className="text-white bg-[#232323] p-10 flex flex-col justify-around items-stretch lg:px-32 mt-10 ">
      <div className="grid grid-cols w-[100%] lg:grid-cols-4 gap-10 justify-around items-stretch border-b-2 border-white pb-6">
        <div className="w-auto space-y-4 -mt-2">
          <Link to="/home">
            <img
              src={mentorLogo}
              alt="Logo Mentor"
              className=" lg:w-[209px] lg:h-[37px]"
            />
          </Link>
          <p className="lg:w-60 w-64 lg:text-sm text-start">
            With Mentor Token, every failure transforms into an opportunity for
            growth.
          </p>
        </div>

        <div className="flex-col justify-stretch items-start space-y-4 pt-2 lg:pt-0 hidden lg:block ">
          {/* {Pages} */}
          <h1 className="font-semibold">Pages</h1>
          <ul className="space-y-1">
            <li>
              <Link to="/Home" className="hover:text-[#696CFF]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#696CFF]">
                ContactUS
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-col justify-center items-center space-y-4 hidden lg:block">
          {/* {Contact} */}
          <h1 className="font-semibold">Contact</h1>
          <ul className="text-sm space-y-1">
            <li>info@mentortoken.com</li>
            <li>+ ( 389 ) 123 456 789</li>
          </ul>
        </div>
        <div className="flex flex-raw items-center justify-start  lg:flex-col lg:items-center  space-x-4 lg:space-y-4 ">
          {/* {Follow Us} */}
          <h1 className="font-semibold">Follow Us</h1>
          <div className="flex items-start justify-start gap-4 ">
            {SOCIALLOGOS.map((item) => (
              <img
                key={item.id}
                src={item.logo}
                alt="Logo Social"
                className="w-9 h-9"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="py-6">
        <p>©2024 Mentor Token. All right reserved.</p>
      </div>
    </div>
  );
}
