import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { sendPasswordReset, reset } from "../features/auth/authSlice";

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
    dispatch(sendPasswordReset(email)); // Dispatch the password reset request action
  };

  return (
    <div className="bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Meraki UI
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                  alt=""
                />
              </div>
              <p className="mt-3 text-gray-300">Reset Your Password Here</p>
            </div>
            <div className="mt-8">
              {isLoading && <Spinner />}
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="example@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className="block w-full px-4 py-2 mt-2 border rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <button
                  className="w-full mt-6 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  type="submit"
                  disabled={isLoading}
                >
                  <span>Reset Password </span>
                </button>
              </form>
              <p className="mt-3 text-sm text-gray-300">
                To reset your password, please enter the registered email
                account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <section className="bg-gray-900">
    //   <div className="container px-4 py-16 mx-auto lg:flex lg:items-center lg:justify-between">
    //     <h2 className="text-2xl font-semibold tracking-tightxl:text-3xl text-white">
    //       Reset Your Password Here
    //     </h2>
    //     {isLoading && <Spinner />}
    //     <div className="mt-8 lg:mt-0">
    //       <form
    //         onSubmit={handleSubmit}
    //         className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2"
    //       >
    //         <input
    //           id="email"
    //           type="text"
    //           className="px-4 py-2 border  rounded-lg sm:mx-2 bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
    //           placeholder="Email Address"
    //           name="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //         <button
    //           className="px-6 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
    //           type="submit"
    //           disabled={isLoading}
    //         >
    //           Reset Password
    //         </button>
    //       </form>
    //       <p className="mt-3 text-sm text-gray-300">
    //         To reset your password, please enter the registered email account.
    //       </p>
    //     </div>
    //   </div>
    // </section>
  );
}
