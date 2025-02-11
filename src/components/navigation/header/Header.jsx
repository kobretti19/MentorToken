import { logomentorImg, tokentext } from "../../../assets/data/logo";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import LinkNav from "../../../../ui/Link";
import { IoArrowForwardSharp } from "react-icons/io5";

const ROUTES = ["Home", "About", "Contact"];

export default function Header() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  return (
    <nav className="flex flex-wrap items-center justify-between p-10 xl:px-24">
      <LinkNav to="/">
        {/* {Logo } */}
        <div className="flex flex-row items-center lg:gap-4 gap-1">
          <img
            src={logomentorImg}
            alt="Mentor Logo"
            className="lg:h-[39.02px] lg:w-[39.02px] w-5 h-5"
          />
          <img
            src={tokentext}
            alt=""
            className="lg:h-[37px] lg:w-[209.87px] w-28 h-auto"
          />
        </div>
      </LinkNav>
      {/* { Burger button} */}
      <button
        onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
        className=" lg:hidden hover:bg-gray-100 focus:ring:2 focus:ring-gray-200 rounded-lg"
      >
        <RxHamburgerMenu size={25} className="text-[#696cff]" />
      </button>
      {/* {Menu List } */}
      <div
        className={`${
          isMobileMenuShown ? "" : "hidden"
        } w-full lg:w-auto lg:block`}
      >
        <ul className="lg:space-x-8 flex flex-col lg:flex-row bg-gray-50 text-lg border border-gray-100 lg:border-none rounded-lg p-4 lg:bg-transparent">
          {ROUTES.map((route, i) => {
            return (
              <li
                className={`rounded py-2 px-3 cursor-pointer ${
                  i === 0
                    ? "bg-[#696CFF] text-white lg:bg-transparent lg:text-[#696CFF]"
                    : "hover:bg-gray-50 hover:lg:text-[#696CFF] "
                }`}
                key={i}
              >
                <LinkNav to={`/${route}`}>{route}</LinkNav>
              </li>
            );
          })}
        </ul>
      </div>
      {/* { Login } */}
      <div className="absolute top-16 left-1/4 lg:static">
        <div className="items-center justify-between gap-6  shaddow-md text-lg w-auto hidden lg:flex">
          <LinkNav className="hover:text-[#696CFF]">Login</LinkNav>
          <div className="text-white  justify-around gap-4 items-center bg-[#696cff] px-3 hidden lg:flex rounded-md py-2 hover:scale-110 hover:bg-[#5d5fd6] transition-all easy-in-out ">
            <IoArrowForwardSharp />
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
