import { useEffect, useState } from "react";
import { InputsVariants } from "../../../ui/InputsVariants";
import axios from "axios";

/* eslint-disable react/prop-types */
export default function ForgotPasswordModal({ modal, onClose }) {
  const [inputEmail, setInputEmail] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (modal) {
      setSuccess(false);
      setInputEmail("");
    }
  }, [modal]);

  const handleResetPassword = async () => {
    if (inputEmail) {
      try {
        await axios.post("http://127.0.0.1:3000/api/v1/users/forgotPassword", {
          email: inputEmail,
        });
        setSuccess(true);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    }
  };

  if (!modal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-start justify-center bg-white w-[400px] p-6 rounded-lg shadow-lg relative h-64">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        <div className="flex flex-col items-end gap-y-5 p-4 w-full">
          {success ? (
            <div className="text-center w-full">
              <p className="text-green-600 text-lg font-semibold">Success!</p>
              <p className="text-gray-700 mt-2">
                A password reset link has been sent to{" "}
                <strong>{inputEmail}</strong>.
              </p>
            </div>
          ) : (
            <>
              <InputsVariants
                label="Enter your email address"
                required={true}
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <button
                onClick={handleResetPassword}
                className="bg-[#696cff] text-white px-6 py-2 text-sm rounded-lg mt-4 hover:bg-[#696cffdf] hover:transform hover:scale-105"
              >
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
