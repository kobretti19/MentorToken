import { Link, useNavigate } from "react-router";
import { laptopImg } from "../../assets/data/logo";
import GetStartedButton from "../../../ui/GetStartedButton";

export default function LaptopDetail() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row  h-[auto] rounded-xl bg-[url(/images/background-laptop.png)] relative   ">
      <div className="flex-1 p-6 lg:pt-16 space-y-6 w-full ">
        <div className="text-3xl lg:w-[500px] lg:text-4xl  font-semibold md:text-5xl  tracking-wide">
          <h1>
            Grow your StartUp! <br /> Monitoring and Evaluating now is easy!
          </h1>
        </div>
        <p className=" font-thin lg:w-[500px] md:text-lg ">
          Welcome to Mentor Token, where we redefine the dynamics of start-up
          success. Our innovative platform offers a transformative approach to
          mentorship, ensuring that mentors are not just engaged but motivated
          to drive the success of the ventures they support.
        </p>
        <div className="flex items-center gap-4 lg:pt-10">
          <GetStartedButton
            onClick={() => navigate("/signup")}
            btnText="Get started"
          />
          <Link className="hover:text-[#696CFF] hover:scale-110 transition-all easy-in-out">
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="lg:flex-1">
        <img
          src={laptopImg}
          alt="Laptop Image"
          className="w-[800px] h-auto lg:h-auto  rounded-br-xl"
        />
      </div>
    </div>
  );
}
