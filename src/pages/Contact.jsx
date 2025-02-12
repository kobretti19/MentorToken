import { useScreenDetector } from "../hooks/useScreenDetector";

export default function Contact() {
  const { isMobile, isTablet, isDesktop } = useScreenDetector();

  if (isMobile) {
    return (
      <div className="flex flex-col p-12  gap-6  lg:w-[80%] mx-auto">
        <div className=" bg-[url(/images/background-laptop.png)] flex flex-col p-12 lg:p-20 gap-6 rounded-xl lg:w-[80%] mx-auto ">
          <div className="flex flex-col lg:items-start items-center justify-center gap-6 ">
            <h1 className="text-3xl lg:text-4xl font-bold ">
              Let&apos;s Talk!
            </h1>
            <p className="text-xs font-thin tracking-wide text-center lg:text-start">
              We&apos;re thrilled to connect with you! Whether you have a
              question, need assistance, or want to discuss a potential project,
              we&apos;sre here to listen and help. At Mentor Token, we believe
              in the power of collaboration and are committed to providing you
              with the best support and solutions. Fill out the form below, and
              one of our team members will get back to you as soon as possible.
              <strong className="font-semibold">
                Let&apos;s create something amazing together!
              </strong>
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-y-4 ">
            <div className="flex flex-col w-full justify-center gap-2 text-sm">
              <Input type="text" placeholder="Full Name" />
              <Input type="text" placeholder="Email adress" />
            </div>
            <div className="h-auto lg:h-48">
              <textarea
                type="text"
                placeholder="Your message"
                className="px-4 py-2 mb-4 text-xs text-left rounded-md w-full h-2/3 border border-[#696cff]"
              />
            </div>
          </div>
          <div className="flex flex-row lg:justify-end lg:pt-8">
            <button className="text-white flex justify-around items-center text-xs lg:text-sm w-36 gap-4  bg-[#696cff] px-2 rounded-md py-2 hover:scale-110 hover:bg-[#5d5fd6] transition-all easy-in-out">
              SEND MESSAGE
            </button>
          </div>
        </div>
      </div>
    );
  } else if (isTablet) {
    return (
      <div className=" bg-[url(/images/background-laptop.png)] flex flex-col p-12 lg:p-20 gap-6 rounded-xl lg:w-[80%] mx-auto ">
        <div className="flex flex-col lg:items-start items-center justify-center gap-6 ">
          <h1 className="text-3xl lg:text-4xl font-bold ">Let&apos;s Talk!</h1>
          <p className="text-xs font-thin tracking-wide text-center lg:text-start ">
            We&apos;re thrilled to connect with you! Whether you have a
            question, need assistance, or want to discuss a potential project,
            we&apos;sre here to listen and help. At Mentor Token, we believe in
            the power of collaboration and are committed to providing you with
            the best support and solutions. Fill out the form below, and one of
            our team members will get back to you as soon as possible.
            <strong className="font-semibold">
              Let&apos;s create something amazing together!
            </strong>
          </p>
        </div>
        <div className="flex flex-col gap-y-6 ">
          <div className="flex flex-row w-full justify-center gap-2 text-sm">
            <Input type="text" placeholder="Full Name" />
            <Input type="text" placeholder="Email adress" />
          </div>
          <div className="h-auto lg:h-48">
            <textarea
              type="text"
              placeholder="Your message"
              className="px-4 py-2 text-xs text-left rounded-md w-full h-2/3 border border-[#696cff]"
            />
          </div>
        </div>
        <div className="flex flex-row lg:justify-end lg:pt-8">
          <button className="text-white flex justify-around items-center text-xs lg:text-sm w-36 gap-4  bg-[#696cff] px-2 rounded-md py-2 hover:scale-110 hover:bg-[#5d5fd6] transition-all easy-in-out">
            SEND MESSAGE
          </button>
        </div>
      </div>
    );
  } else if (isDesktop) {
    return (
      <div className=" bg-[url(/images/background-laptop.png)] flex flex-col p-12 lg:p-20 gap-6 rounded-xl lg:w-[95%] mx-auto ">
        <div className="flex flex-col lg:items-start items-center justify-center gap-6 ">
          <h1 className="text-3xl lg:text-4xl font-bold ">Let&apos;s Talk!</h1>
          <p className="text-xs font-thin tracking-wide text-center lg:text-start">
            We&apos;re thrilled to connect with you! Whether you have a
            question, need assistance, or want to discuss a potential project,
            we&apos;sre here to listen and help. At Mentor Token, we believe in
            the power of collaboration and are committed to providing you with
            the best support and solutions. Fill out the form below, and one of
            our team members will get back to you as soon as possible.
            <strong className="font-semibold">
              Let&apos;s create something amazing together!
            </strong>
          </p>
        </div>
        <div className="flex flex-col gap-y-6 ">
          <div className="flex flex-row w-full justify-center gap-2 text-sm">
            <Input type="text" placeholder="Full Name" />
            <Input type="text" placeholder="Email adress" />
          </div>
          <div className="h-auto lg:h-48">
            <textarea
              type="text"
              placeholder="Your message"
              className="px-4 py-2 text-xs text-left rounded-md w-full h-2/3 border border-[#696cff]"
            />
          </div>
        </div>
        <div className="flex flex-row lg:justify-end lg:pt-8">
          <button className="text-white flex justify-around items-center text-xs lg:text-sm w-36 gap-4  bg-[#696cff] px-2 rounded-md py-3 hover:scale-110 hover:bg-[#5d5fd6] transition-all easy-in-out">
            SEND MESSAGE
          </button>
        </div>
      </div>
    );
  }
}

const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="px-4 py-2 text-xs rounded-md w-full border border-[#696cff]"
    />
  );
};
