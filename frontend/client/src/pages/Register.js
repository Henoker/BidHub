import React, { useState, useEffect  } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';



export default function Register() {
 
	const [formData, setFormData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "re_password": "",
    })

    const { first_name, last_name, email, password, re_password } = formData

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


        if (password !== re_password) {
            toast.error("Passwords do not match")
        } else {
            const userData = {
                first_name,
                last_name,
                email,
                password,
                re_password
            }
            dispatch(register(userData))
        }
    }


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
            toast.success("An activation email has been sent to your email. Please check your email")
        }

        dispatch(reset())

    }, [isError, isSuccess, user, navigate, message, dispatch])


 

  return (
    <section className="bg-gray-900">
      <div className="flex justify-normal min-h-screen">
				<div
				className="hidden bg-cover lg:block lg:w-2/5"
				style={{
					backgroundImage:
					'url("https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80")'
       		    }}
      	>
			  </div>
				
				<div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-900 text-gray-100">
          <h2 className="mb-3 text-3xl font-semibold text-center">Register to Bid</h2>
          <p className="text-sm text-center text-gray-400">Already Registered?
		      <Link to="/login" rel="noopener noreferrer" className="focus:underline hover:underline">Sign in here</Link>
	        </p>
			{isLoading && <Spinner />}
          <form novalidate="" action="" onSubmit={handleSubmit}  className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label for="email" className="block text-sm">Email address</label>
                <input
                type="email" 
				        name="email" 
				        value={formData.email} 
				        placeholder="leroy@jenkins.com"
				        onChange={handleChange} 
				        required
				        className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 dark:border-indigo-400" 
				        />
			        </div>
			        <div className="space-y-2">
				        <label for="first_name" className="block text-sm">First Name</label>
				        <input 
				        type="text" 
				        name="first_name" 
				        value={formData.first_name} 
				        placeholder="John"
				        onChange={handleChange}
				        required
				        className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-indigo-400" 
				        />
			        </div>
					<div className="space-y-2">
				        <label for="last_name" className="block text-sm">Last Name</label>
				        <input 
				        type="text" 
				        name="last_name" 
				        value={formData.last_name} 
				        placeholder="John"
				        onChange={handleChange}
				        required
				        className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-indigo-400" 
				        />
			        </div>
			        <div className="space-y-2">
				        <div className="flex justify-between">
					        <label for="password" className="text-sm">Password</label>
				        </div>
                <input 
				        type="password" 
				        name="password" 
				        value={formData.password} 
				        placeholder="*****"
				        onChange={handleChange}
				        required 
				        className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-indigo-400" 
				        />
		      	</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label for="password2" className="text-sm">Confirm Password</label>
				      </div>
              <input 
				      type="password" 
				      name="re_password" 
				      value={formData.re_password} 
				      placeholder="*****"
				      onChange={handleChange}
				      required 
				      className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-indigo-400" 
				      />
			      </div>
		      </div>
          <input
		      type="submit" 
		      className="w-full px-8 py-3 font-semibold rounded-md bg-indigo-400 text-gray-900"
		      Value="Submit"
		      />
	      </form>
      </div>
      		
   	  </div>

  </section>
  )
}
