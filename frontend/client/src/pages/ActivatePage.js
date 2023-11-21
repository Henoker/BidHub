import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { activate, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

export default function ActivatePage() {
  const { uid, token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token
        }
        dispatch(activate(userData))
        toast.success("Your account has been activated! You can login now")
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/login")
        }

        dispatch(reset())

    }, [isError, isSuccess, navigate, dispatch, message])
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
      <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
        Bring your Business to the{" "}
        <span className="text-blue-500">next level.</span>
      </h2>
      <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quidem
        officiis reprehenderit, aperiam veritatis non, quod veniam fuga possimus
        hic explicabo laboriosam nam. A tempore totam ipsa nemo adipisci iusto!
      </p>
      <div className="inline-flex w-full mt-6 sm:w-auto">
       {isLoading && <Spinner />}
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Activate Account
        </button>
      </div>
    </div>
  </section>
  )
}
