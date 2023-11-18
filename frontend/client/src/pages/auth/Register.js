import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosInstance } from '../../axios/AxiosInstance';


export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    password2: '',
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosInstance.post('auth/register', JSON.stringify(formData))

      

      setFormData({
        email: '',
        username: '',
        password: '',
        password2: '',
      });

      setLoading(false);
      navigate('/auth/login');
    } catch (error) {
      setLoading(false);
      // TODO: handle errors
    }
  };

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

          <form novalidate="" action="" onSubmit={onSubmitForm} className="space-y-8">
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
				        <label for="first_name" className="block text-sm">Username</label>
				        <input 
				        type="text" 
				        name="first_name" 
				        value={formData.username} 
				        placeholder="Jhon"
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
				      name="password2" 
				      value={formData.password2} 
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
          disabled={loading}
		      />
	      </form>
      </div>
      		
   	  </div>

  </section>
  )
}
