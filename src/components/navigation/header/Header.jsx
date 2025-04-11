import { logomentorImg, tokentext } from "../../../assets/data/logo";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import LinkNav from "../../../../ui/Link";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router";

const ROUTES = ["Home", "About", "Contact"];

export default function Header() {
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex flex-wrap items-center justify-between p-10 xl:px-24">
      {/* Logo */}
      <LinkNav to="/">
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

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
        className="lg:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 rounded-lg"
      >
        <RxHamburgerMenu size={25} className="text-[#696cff]" />
      </button>

      {/* Navigation Menu */}
      <div
        className={`${
          isMobileMenuShown ? "" : "hidden"
        } w-full lg:w-auto lg:block`}
      >
        <ul className="lg:space-x-8 flex flex-col lg:flex-row bg-gray-50 text-lg border border-gray-100 lg:border-none rounded-lg p-4 lg:bg-transparent">
          {ROUTES.map((route, i) => {
            const routePath =
              route === "Home" ? "/" : `/${route.toLowerCase()}`;
            const isActive = location.pathname === routePath;

            return (
              <li
                key={i}
                className={`rounded py-2 px-3 cursor-pointer transition-all ease-in-out ${
                  isActive
                    ? "bg-[#696CFF] text-white lg:bg-transparent lg:text-[#696CFF]"
                    : "hover:bg-gray-50 hover:lg:text-[#696CFF] hover:scale-110"
                }`}
                onClick={() => setIsMobileMenuShown(false)} // Close mobile menu on click
              >
                <LinkNav to={routePath}>{route}</LinkNav>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Login & Signup Buttons */}
      <div className="absolute top-16 left-1/4 lg:static bg-transparent">
        <div className="items-center justify-between gap-6 text-lg w-auto hidden lg:flex bg-transparent">
          {/* Login Button */}
          <LinkNav
            className="hover:text-[#696CFF] hover:scale-110 transition-all ease-in-out"
            onClick={() => navigate("/login")}
          >
            Login
          </LinkNav>

          {/* Get Started Button */}
          <div className="text-white justify-around gap-4 items-center bg-[#696cff] px-3 hidden lg:flex rounded-md py-2 hover:scale-110 hover:bg-[#5d5fd6] transition-all ease-in-out">
            <IoArrowForwardSharp />
            <button
              className="bg-transparent text-white"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
