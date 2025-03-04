import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordConfirm, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

export default function ResetPasswordPageConfirm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const userData = {
      token,
      password,
    };

    dispatch(resetPasswordConfirm(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Your password was reset successfully.");
      setTimeout(() => {
        dispatch(reset()); // Reset Redux state
        navigate("/login");
      }, 2000);
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md bg-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
        </div>
        <h3 className="mt-3 text-xl font-medium text-center text-gray-200">
          Reset Your Password
        </h3>

        {isLoading && <Spinner />}
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 border rounded-lg text-gray-300 bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="New password"
              name="password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 border rounded-lg text-gray-300 bg-gray-800 border-gray-600 placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              onChange={handleChange}
              value={confirmPassword}
              required
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Don't have an account?{" "}
        </span>
        <a
          href="/register"
          className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  );
}
