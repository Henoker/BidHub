import React, {useState} from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
	const navigate= useNavigate()
	const [formData, setFormData] = useState({
		email:"",
        first_name:"",
        last_name:"",
        password:"",
        password2:""
	});

	const [error, setError]=useState('')

	const { email, first_name, last_name, password, password2 } = formData;

	const onChange = e => {
			setFormData({...formData, [e.target.name]:e.target.value});
    };


	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('http://localhost:8000/api/v1/auth/register/',formData)
		console.log(response.data)
		const result = response.data
		if(response.status === 201) {
			navigate("/otp/verify")
			toast.success(result.message)
		}

	}
	
	

  return (
    <Layout title='Auth Site | Register' content='Registration page'>
		<section className="bg-gray-900">
			<div className="flex justify-center min-h-screen">
				<div
				className="hidden bg-cover lg:block lg:w-2/5"
				style={{
					backgroundImage:
					'url("https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80")'
       		    }}
      		    >
			    </div>
				<div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
					<div className="w-full">
					<h1 className="text-2xl font-semibold tracking-wider capitalize text-white">
						Register.
          			</h1>
					<p className="mt-4 text-gray-400">
						Let&nbsp;s get you all set up so you can verify your personal account and
           				begin setting up your profile.
          			</p>
					
          			<form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            			<div>
              				<label htmlFor='first_name' className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                				First Name
              				</label>
              				<input
                			type="text"
                			placeholder="John"
							name='first_name'
                			className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							onChange={onChange}
							value={first_name}
							required
							/>
            			</div>
            			<div>
              				<label htmlFor='last_name' className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                				Last name
              				</label>
              				<input
                			type="text"
                			placeholder="Snow"
							name='last_name'
                			className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							onChange={onChange}
							value={last_name}
							required
              				/>
            			</div>
           				<div>
              				<label htmlFor='email' className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                				Email address
              				</label>
              				<input
                			type="email"
                			placeholder="johnsnow@example.com"
							name='email'
                			className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							onChange={onChange}
							value={email}
							required
							/>
            			</div>
            			<div>
              				<label htmlFor='password' className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                				Password
              				</label>
              				<input
                			type="password"
                			placeholder="Enter your password"
							name='password'
                			className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							onChange={onChange}
							value={password}
							required
							/>
            			</div>
						<div>
              				<label htmlFor='password' className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                				Confirm Password
              				</label>
              				<input
                			type="password"
                			placeholder="Confirm your password"
							name='password2'
                			className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							onChange={onChange}
							value={password2}
							required
							/>
            			</div>
						<div>
						<button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
							<span>Register </span>
              				<svg
                			xmlns="http://www.w3.org/2000/svg"
                			className="w-5 h-5 rtl:-scale-x-100"
                			viewBox="0 0 20 20"
                			fill="currentColor"
              				>
                			<path
                  			fillRule="evenodd"
                  			d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  			clipRule="evenodd"
                			/>
              				</svg>
           				</button>           
						</div>
									
						
          			</form>
        		</div>
     		</div>
      		
   		    </div>
  </section>
  <Toaster position="top-right" reverseOrder={false} />
	</Layout>
  )
}

export default RegisterPage