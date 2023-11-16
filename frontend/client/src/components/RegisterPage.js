import React, {useState} from 'react';
import Layout from './Layout';
import { Link, useNavigate } from 'react-router-dom';
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
	
	
	<form novalidate="" action="" onSubmit={onSubmit} className="space-y-8">
		<div className="space-y-4">
			<div className="space-y-2">
				<label for="email" className="block text-sm">Email address</label>
				<input 
				type="email" 
				name="email" 
				value={email} 
				placeholder="leroy@jenkins.com"
				onChange={onChange} 
				required
				className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 dark:border-indigo-400" 
				/>
			</div>
			<div className="space-y-2">
				<label for="first_name" className="block text-sm">Fisrt Name</label>
				<input 
				type="text" 
				name="first_name" 
				value={first_name} 
				placeholder="Jhon"
				onChange={onChange}
				required
				className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100 focus:border-indigo-400" 
				/>
			</div>
			<div className="space-y-2">
				<label for="last_name" className="block text-sm">Last Name</label>
				<input 
				type="text" 
				name="last_name" 
				value={last_name} 
				placeholder="Snow" 
				onChange={onChange}
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
				value={password} 
				placeholder="*****"
				onChange={onChange}
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
				name="password2" 
				value={password2} 
				placeholder="*****"
				onChange={onChange}
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
<Toaster position="top-right" reverseOrder={false} />
  </section>
  
	</Layout>
  )
}

export default RegisterPage