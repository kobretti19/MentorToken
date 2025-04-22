import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4qb42if",
        "template_9qwqoa7",
        form.current,
        "Fhy_K-buLjchI5Z93"
      )
      .then(
        (result) => {
          console.log("Email sent!", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("Email failed:", error.text);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="flex flex-col p-12 gap-6 lg:w-[70%] mx-auto"
    >
      <div className="bg-[url(/images/background-laptop.png)] flex flex-col p-12 lg:p-20 gap-6 rounded-xl w-full">
        <div className="flex flex-col lg:items-start items-center justify-center gap-6">
          <h1 className="text-3xl lg:text-4xl font-bold">Let&apos;s Talk!</h1>
          <p className="text-md font-thin tracking-wide text-center lg:text-start">
            We&apos;re thrilled to connect with you! Whether you have a
            question, need assistance, or want to discuss a potential project,
            we&apos;re here to help.
            <strong className="font-semibold">
              Let&apos;s create something amazing together!
            </strong>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col lg:flex-row w-full justify-center gap-2 text-sm">
          <Input
            type="text"
            name="user_name"
            placeholder="Full Name"
            required
          />
          <Input
            type="email"
            name="user_email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="h-auto lg:h-48">
          <textarea
            name="message"
            placeholder="Your message"
            className="px-4 py-2 text-xs rounded-md w-full h-24 lg:h-full border border-[#696cff]"
            required
          />
        </div>
      </div>

      <div className="flex flex-row lg:justify-end lg:pt-8">
        <button
          type="submit"
          className="text-white flex justify-around items-center text-xs lg:text-sm w-36 gap-4 bg-[#696cff] px-4 rounded-md py-2 hover:scale-110 hover:bg-[#5d5fd6] transition-all ease-in-out"
        >
          SEND MESSAGE
        </button>
      </div>
    </form>
  );
}

const Input = ({ ...props }) => (
  <input
    {...props}
    className="px-4 py-2 text-xs rounded-md w-full border border-[#696cff]"
  />
);
