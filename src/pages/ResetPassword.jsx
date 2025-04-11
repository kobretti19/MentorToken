import { useNavigate, useParams } from "react-router";
import { InputsVariants } from "../../ui/InputsVariants";
import Button from "../../ui/Button";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const token = params.token;

  const navigate = useNavigate();

  const handleSubmitPassword = () => {
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain min 8 characters");
      return;
    }

    const fetchPasswordChange = async () => {
      try {
        const response = await axios.patch(
          `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
          { password: password }
        );
        console.log(response.data);

        setError("");
        setPassword("");
        setPasswordConfirm("");
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong.");
        setSuccess(false);
      }
    };

    fetchPasswordChange();
  };

  return (
    <div
      className="flex lg:flex-row flex-col justify-around items-center w-full h-screen relative overflow-hidden z-[10] 
      bg-gradient-to-b from-[#7073fd] via-[#7073fd] to-[#947afe] 
      before:content-[''] before:absolute before:inset-0 before:block 
      before:bg-[url(/images/vectary-texture.png)] before:opacity-100 before:z-[-5]"
    >
      <div className="flex flex-col items-start gap-4 w-1/5 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-2">Reset Password</h1>

        {success ? (
          <div className="text-green-600 font-medium">
            Password successfully reset! You can now log in.
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login in 5 seconds...
            </p>
          </div>
        ) : (
          <>
            <InputsVariants
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <InputsVariants
              label="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleSubmitPassword} btnText="Submit" />
          </>
        )}
      </div>
    </div>
  );
}
