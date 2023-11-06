import React, {useState} from 'react';
import Layout from '../components/Layout';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/user';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const { registered, loading } = useSelector(state => state.user);

	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	});

	const { first_name, last_name, email, password} = formData;

	const onChange = e => {
			setFormData({...formData, [e.target.name]:e.target.value});
    };


	const onSubmit = e => {
		e.preventDefault();
		dispatch(register({ first_name, last_name, email, password}));
	}
	
	if (registered) return <Navigate to='/login' />;

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
						Let’s get you all set up so you can verify your personal account and
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
						{loading ? (
							<div role="status">
							<svg aria-hidden="true" className="w-8 h-8 mr-2animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
							</svg>
							<span className="sr-only">Loading...</span>
						</div>
						) : (
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

						)}
            			
						
          			</form>
        		</div>
     		</div>
      		
   		    </div>
  </section>
	</Layout>
  )
}

export default RegisterPage