import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const VerifyEmail = () => {
    const [otp, setOtp]=useState("")
    const navigate=useNavigate()

    const handleOtpSubmit = async(e)=>{
            e.preventDefault()
            if (otp) {
                const res = await axios.post('http://localhost:8000/api/v1/auth/verify-email/', {'otp':otp})
                const resp = res.data
                if (res.status === 200) {
                    navigate('/login')
                    toast.success(resp.message)
                }
                
            }
            
    }
  return (
    // <div>
    //     <div className='form-container'>
    //         <form action="" style={{width:"30%"}} onSubmit={handleOtpSubmit}>
    //            <div className='form-group'>
    //              <label htmlFor="">Enter your Otp code:</label>
    //              <input type="text"
    //               className='email-form'  
    //               name="otp"
    //               value={otp}
    //               onChange={(e)=>setOtp(e.target.value)} 
    //                />
    //            </div>
    //            <button type='submit' className='vbtn'>Send</button>
    //         </form>
    //     </div>
    // </div>
    <section className="bg-gray-900">
    <div className="max-w-3xl px-6 py-16 mx-auto text-center">
      <h1 className="text-3xl font-semibold text-gray-100">
        verify your Email with your OTP code
      </h1>
      <p className="max-w-md mx-auto mt-5 text-gray-400">
      Enter your Otp code:
      </p>
      <form 
      className="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2"
      onSubmit={handleOtpSubmit}
      >
        <input
          type="text"
          className="px-4 py-2   border rounded-md sm:mx-2 bg-gray-900 text-gray-300 border-gray-600  focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="OTP code"
          name="otp"
          value={otp}
          onChange={(e)=>setOtp(e.target.value)} 
        />
        <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md sm:mx-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
    <Toaster position="top-right" reverseOrder={false} />
  </section>
  )
}

export default VerifyEmail