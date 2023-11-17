import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import AxiosInstance from '../axios/AxiosInstance'

const PasswordResetRequest = () => {
    const [email, setEmail]=useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (email) {
          const res = await AxiosInstance.post('auth/password-reset/', {'email':email})
           if (res.status === 200) {
            console.log(res.data)
            toast.success('a link to reset your password has be sent to your email')
            
           } 
           setEmail("")
        }
        


    }

  
  return (
    
       
    <section className="bg-gray-900">
    <div className="container px-4 py-16 mx-auto lg:flex lg:items-center lg:justify-between">
      <h2 className="text-2xl font-semibold tracking-tight  xl:text-3xl text-white">
        Submit Email
      </h2>
      <form 
      className="mt-8 lg:mt-0"
      onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="px-4 py-2 border  rounded-lg sm:mx-2 bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Email Address"
          />
          <button className="px-6 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
            Send
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-300">
          Please submit your email so that we can send you password reset link. 
        </p>
      </form>
    </div>
    <Toaster position="top-right" reverseOrder={false} />
  </section>
    
  )
}

export default PasswordResetRequest