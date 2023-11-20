import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login, reset, getUserInfo } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"


export default function Login() {
  const [formData, setFormData] = useState({
    "email": "",
    "password": "",
})

const { email, password } = formData

const dispatch = useDispatch()
const navigate = useNavigate()

const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    })
    )
}

const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
        email,
        password,
    }
    dispatch(login(userData))
}


useEffect(() => {
    if (isError) {
        toast.error(message)
    }

    if (isSuccess || user) {
        navigate("/dashboard")
    }

    dispatch(reset())
    dispatch(getUserInfo())

}, [isError, isSuccess, user, navigate, dispatch, message])



return (
    <div className="bg-gray-900">
    <div className="flex justify-center h-screen">
      <div
        className="hidden bg-cover lg:block lg:w-2/3"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
        }}
      >
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Meraki UI
            </h2>
            <p className="max-w-xl mt-3 text-gray-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem
              ipsa, nulla laboriosam dolores, repellendus perferendis libero
              suscipit nam temporibus molestiae
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
            <p className="mt-3 text-gray-300">
              Sign in to access your account
            </p>
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
                  onChange={handleChange}
                  value={email}
                  required
                  className="block w-full px-4 py-2 mt-2 border rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-200"
                  >
                    Password
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 mt-2 border rounded-lg placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              
              
							<button 
              className="w-full mt-6 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
							<span>Login </span>
           	  </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-400">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="text-blue-500 focus:outline-none focus:underline hover:underline"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  );
}
