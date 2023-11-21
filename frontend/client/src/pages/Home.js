import React from 'react'
export default function Home() {
  return (
    <section className='bg-gray-900'>
			<div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
    <div className="w-full lg:w-1/2">
      <div className="lg:max-w-lg">
        <h1 className="text-3xl font-semibold tracking-wide text-white lg:text-4xl">
          Easiest way to bid
        </h1>
        <div className="mt-8 space-y-5">
          <p className="flex items-center -mx-2 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="mx-2">Clean and Simple Layout</span>
          </p>
          <p className="flex items-center -mx-2 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="mx-2">Just Copy Paste Codeing</span>
          </p>
          <p className="flex items-center -mx-2 text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-2 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="mx-2">Easy to Use</span>
          </p>
        </div>
      </div>
      {/* <div className="w-full space-x-4 mt-8 bg-transparent rounded-md lg:max-w-sm">
       
			<Link to="/login" className="px-8 py-3 font-semibold rounded bg-indigo-400 text-gray-900">Login</Link>
			<Link to="/register" className="px-8 py-3 font-semibold rounded bg-indigo-400 text-gray-900">Register</Link>
      </div> */}
    </div>
    <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
      <img
        className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
        src="https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=''
      />
    </div>
  </div>
</section>
  )
}
