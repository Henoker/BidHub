import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { passwordResetRequest, reset } from "../features/auth/authSlice";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message); // Display error message
    }

    if (isSuccess) {
      toast.success("Password reset email sent successfully!"); // Display success message
      navigate("/login"); // Redirect to login page after successful request
    }

    dispatch(reset()); // Reset the state when the component unmounts
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordResetRequest(email)); // Dispatch the password reset request action
  };

  return (
    <section className="bg-gray-900">
      <div className="container px-4 py-16 mx-auto lg:flex lg:items-center lg:justify-between">
        <h2 className="text-2xl font-semibold tracking-tightxl:text-3xl text-white">
          Reset Your Password Here
        </h2>
        {isLoading && <Spinner />}
        <div className="mt-8 lg:mt-0">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2"
          >
            <input
              id="email"
              type="text"
              className="px-4 py-2 border  rounded-lg sm:mx-2 bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="px-6 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              type="submit"
              disabled={isLoading}
            >
              Reset Password
            </button>
          </form>
          <p className="mt-3 text-sm text-gray-300">
            To reset your password, please enter the registered email account.
          </p>
        </div>
      </div>
    </section>
  );
}
