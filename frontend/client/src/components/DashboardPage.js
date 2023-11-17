import Layout from './Layout'
import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import AxiosInstance from "../utils/AxiosInstance";



const DashboardPage = () => {
	// const user = JSON.parse(localStorage.getItem('user'))
	const [userName, setUserName] = useState('');
    const navigate = useNavigate();

	useEffect(() => {
		 getSomeData()	
	  }, [])
	  
	 const getSomeData =async ()=>{
		try {
			const res =await AxiosInstance.get('auth/get-something/')
		 	console.log(res.data)
			if (res.data && res.data.user && res.data.user.full_name) {
				setUserName(res.data.user.full_name);
			}
			console.log('full_name')
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		 
	 }
	 

	 const handleLogout = async ()=>{
		try {
			const res = await AxiosInstance.post('auth/logout/');
			if (res.status === 204) {
				navigate('/login');
				toast.success('Logout successful');
			  }
		} catch (error) {
			console.error('Error logging out:', error);
			
		}
		
	  }
  return (
    <Layout title='Auth Site | Dashboard' content='Dashboard page'>
		<section className="bg-gray-900">
    <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
      <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight xl:text-3xl text-white">
	  welcome to your profile{" "}
        <span className="text-blue-500">{userName}</span>
      </h2>
      <p className="max-w-4xl mt-6 text-center text-gray-300">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quidem
        officiis reprehenderit, aperiam veritatis non, quod veniam fuga possimus
        hic explicabo laboriosam nam. A tempore totam ipsa nemo adipisci iusto!
      </p>
      <div className="inline-flex w-full mt-6 sm:w-auto">
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          logout
        </button>
      </div>
    </div>
  </section>
			
  <Toaster position="top-right" reverseOrder={false} />
	</Layout>
  )
}

export default DashboardPage