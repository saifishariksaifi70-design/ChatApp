import React from 'react'
import bg from '../../assets/bg.png'
import { FaEye, FaEyeSlash, FaMessage } from 'react-icons/fa6'
import { IoChatbubble  } from 'react-icons/io5'
import message from '../../assets/messaging.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
function Login() {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth()
    const [userInput, setUserInput] = useState({})
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
const handleInput=(e)=>{
    setUserInput({
        ...userInput,[e.target.id]:e.target.value
    })

}

const handleSubmit=async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
        const login = await axios.post('/api/auth/login',userInput)
        const data = login.data;
        if(data.success === false){
            setLoading(false)
            toast.error(data.message)
            return
        }
        toast.success(data.message)
        localStorage.setItem('chatApp',JSON.stringify(data))
        setAuthUser(data)
        setLoading(false)
        navigate('/')
        

    } catch (error) {
        setLoading(false)
         toast.error(
                error.response?.data?.message || 'Login failed'
            )
        console.log(error)
        
    }

}

  return (
    <div className='flex justify-center items-center h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat'
    style={{backgroundImage: `url(${bg})`}}>
        <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10'>
            {/* Icons */}
            <div className='flex justify-center mb-5'>
                <div className='w-16 h-16 rounded-2xl flex justify-center items-center'>
                    <img src={message} alt="message" className='text-4xl text-white' />

                </div>

            </div>
            {/* Heading */}
            <div className='text-center mb-8'>
                <h1 className='text-3xl font-bold text-gray-900'>
                    Login To <span className='text-purple-600'>Chat App</span>
                </h1>
                <p className='text-gray-500 mt-2'>
                    Welcome Back! pls Login To Continue
                </p>

            </div>

           {/* Form */}
           <form onSubmit={handleSubmit}>
             {/* Email */}
            <div className='mb-5'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address
                </label>
                <input id='email' 
                type="email"
                required
                placeholder='Enter Your Email'
                onChange={handleInput}
                className='w-full h-12 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600' />

            </div>
            {/* password */}
            <div className='mb-5 relative' >
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Password
                </label>
                <input id='password' 
                type={showPassword ? "text": "password"}
                required
                placeholder='Enter Your Password'
                onChange={handleInput}
                className='w-full h-12 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600' />
                <button type='button'
                onClick={()=>setShowPassword(!showPassword)}
                className='absolute right-4 top-13 -translate-y-1/2 text-gray-500'>
                    {showPassword? <FaEyeSlash/> : <FaEye/>}
                </button>

            </div>
            {/* Login button */}
            <button type='submit' 
            className='w-full h-12 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition'>
                {loading? "Loding...":"Login"}
            </button>

           </form>
            {/* Register */}
            <p className='text-center text-sm text-gray-500 mt-6'>
                Dont't have an account?{' '}
                <Link to='/Register'>
                 <span className='text-purple-600 font-semibold cursor-pointer'>
                    Register
                </span>
                </Link>
            </p>

           

        </div>

        
    </div>
  )
}

export default Login