import { Link } from "react-router-dom";
import { SOCIALLOGOS, mentorLogo } from "../../../assets/data/footer";

export default function Footer() {
  return (
    <footer className="text-white bg-[#232323] p-10 lg:px-32 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 border-b-2 border-white pb-6">
        {/* Logo & Description */}
        <div className="space-y-4">
          <Link to="/">
            <img
              src={mentorLogo}
              alt="Mentor Logo"
              className="lg:w-[209px] lg:h-[37px]"
            />
          </Link>
          <p className="lg:w-60 text-sm w-1/2">
            With Mentor Token, every failure transforms into an opportunity for
            growth.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex flex-col space-y-4">
          <h1 className="font-semibold">Pages</h1>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-[#696CFF]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#696CFF]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="hidden lg:flex flex-col space-y-4">
          <h1 className="font-semibold">Contact</h1>
          <ul className="text-sm space-y-1">
            <li>info@mentortoken.com</li>
            <li>+ (389) 123 456 789</li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-start lg:items-center space-y-4">
          <h1 className="font-semibold">Follow Us</h1>
          <div className="flex gap-4">
            {SOCIALLOGOS.map(({ id, logo }) => (
              <img key={id} src={logo} alt="Social Logo" className="w-9 h-9" />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="py-6 text-center">
        <p>©2024 Mentor Token. All rights reserved.</p>
      </div>
    </footer>
  );
}
