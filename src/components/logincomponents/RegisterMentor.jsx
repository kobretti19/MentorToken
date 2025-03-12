import { InputsVariants } from "../../../ui/InputsVariants";
import { logomentorImg } from "../../assets/data/logo";
import { uploadProfile } from "../../assets/data/icons";
import { photoIcon } from "../../assets/data/icons";
import { Checkbox } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function RegisterMentor() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [avatarURL, setAvatarURL] = useState(uploadProfile);
  const email = useSelector((state) => state.createUser.email);
  const password = useSelector((state) => state.createUser.password);

  const navigate = useNavigate();

  console.log(email, "emailstate", password);

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };
  const handleFileChange = () => {
    const file = fileUploadRef.current.files[0];
    console.log(file);
    setAvatarURL(URL.createObjectURL(file));
    if (file) {
      setPhoto(file);
    }
  };

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("phone", phone);
  formData.append("adress", adress);
  formData.append("photo", photo);
  formData.append("name", name);

  const handleUpload = async () => {
    console.log(email, password, "email,password");

    try {
      const loginData = await fetch(
        "http://localhost:3000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name,
            phone,
            adress,
            photo,
          }),
        }
      );

      const data = await loginData?.json();

      console.log(data);
      if (data) {
        if (data?.status === "success") {
          alert(`Account created succussfully`);
          navigate("/login");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-y-6 bg-white lg:w-3/5 w-full h-screen   lg:rounded-l-3xl   px-10 lg:px-72   ">
      <div className="flex flex-col justify-start items-start gap-y-4 ">
        <img src={logomentorImg} alt="Token" className="w-[49px] h-[59.44px]" />
        <div className="flex flex-col font-semibold items-start justify-start text-3xl gap-y-2 text-[#566a7f]">
          <h1 className="uppercase text-start">Setup mentor account</h1>
        </div>
      </div>
      <div className="flex mx-auto relative ">
        <img
          src={avatarURL}
          alt="Upload Icon"
          className="w-[121.76px] h-[121.76px] rounded-full"
        />
        {/* <form
          id="form"
          encType="multipart/form-data"
          className="flex flex-col  gap-8"
        > */}
        <button
          type="submit"
          className="flex-center absolute bottom-10 -right-8  rounded-full"
          onClick={handleImageUpload}
        >
          <img src={photoIcon} alt="edit Photo icon" className="object-cover" />
        </button>
        <input
          type="file"
          name="photo"
          id="file"
          ref={fileUploadRef}
          onChange={handleFileChange}
          accept="image/*"
          hidden
        />
        <div className="flex justify-start  w-full relative"></div>
        {/* </form> */}
      </div>

      <div className="w-full flex flex-col gap-y-6 text-[#566a7f]">
        <InputsVariants
          onChange={(e) => setName(e.target.value)}
          label="Mentor Name"
          placeholder="Name and surname"
        />
        <InputsVariants
          onChange={(e) => setPhone(e.target.value)}
          label="Phone"
          placeholder="Phone"
        />
        <InputsVariants
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          placeholder="Address"
        />
      </div>
      <div className="flex flex-col justify-center  items-center w-full gap-y-2">
        <button
          onClick={handleUpload}
          className="text-white  bg-[#696cff] px-4 py-2 w-full rounded-md hover:bg-opacity-90 easy-in-out transition-all easy-in-out hover:scale-105"
        >
          Register
        </button>
        <div className="flex items-center justify-start gap-x-4 w-full">
          <Checkbox color="indigo" className="w-[14px] h-[14px] rounded-none" />
          <p className="text-[#566a7f] text-xs">
            By signing up to create an account I accept Company&apos;s
            <span className="text-[#696cff]">
              Terms of use & Privacy Policy.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
