import React, {useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import AxiosInstance from '../utils/AxiosInstance';

const ResetPassword = () => {
  const navigate=useNavigate()
  const {uid, token}=useParams()
  const [newpasswords, setNewPassword]=useState({
    password:"",
    confirm_password:"",
  })
  const {password, confirm_password}=newpasswords

  const handleChange=(e)=>{
    setNewPassword({...newpasswords, [e.target.name]:e.target.value})
}

const data={
  "password":password,
  "confirm_password":confirm_password,
  "uidb64":uid,
  "token": token,
}
 const handleSubmit =async (e)=>{
    e.preventDefault()
    if (data) {
      const res = await AxiosInstance.patch('auth/set-new-password/', data)
      const response = res.data
      if (res.status === 200) {
           navigate('/login')
           toast.success(response.message)
      }
      console.log(response)
    }
    
 }
  return (
    <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-gray-800">
    <h2 className="text-lg font-semibold  capitalize text-white">
      Enter your new password
    </h2>
    <form
    onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label
            className="text-gray-200"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            name='password'
            value={password}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2  border  rounded-md bg-gray-800 text-gray-300 border-gray-600  focus:ring-blue-300 focus:ring-opacity-40 focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            className="text-gray-200"
            htmlFor="passwordConfirmation"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2  border  rounded-md bg-gray-800 text-gray-300 border-gray-600  focus:ring-blue-300 focus:ring-opacity-40 focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          Submit
        </button>
      </div>
    </form>
    <Toaster position="top-right" reverseOrder={false} />
  </section>
  )
}

export default ResetPassword