import React, { useState } from 'react'
import Message from '../../assets/messaging.png'
import bg from '../../assets/bg.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

function Register1() {
    const navigate = useNavigate();
    const { setAuthUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [inputData, setInputData] = useState({})

    const handleInput = (e) => {
        setInputData({
            ...inputData, [e.target.id]: e.target.value
        })

    }
    const selectGender = (selectGender) => {
        setInputData((prev) => ({
            ...prev, 
            gender: selectGender === inputData.gender ? "" : selectGender
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (inputData.password != inputData.confpassword) {
            setLoading(false)
            return toast.error("Password Does't match")
        }
        try {
            const register = await axios.post('/api/auth/register', inputData)
            const data = register.data;
            if (data.success === false) {
                setLoading(false)
                return toast.error(data.message)

            }
            toast.success(data.message)
            localStorage.setItem('chatapp', JSON.stringify(data))
             setAuthUser(data)
            setLoading(false)
            navigate('/login')

        } catch (error) {
            setLoading(false)
            toast.error(
                error.response?.data?.message || 'Login failed'
            )
            console.log(error)

        }

    }
    return (
        <div className='flex justify-center items-center h-250 w-full overflow-hidden bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${bg})` }}>
            <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl px-4 sm:p-10'>
                {/* Icons */}
                <div className='flex justify-center items-center mb-5'>
                    <div className='w-18 h-18 bg-purple-600 rounded-2xl flex justify-center items-center'>
                        <img src={Message} alt="message" className='text-4xl text-white' />

                    </div>

                </div>
                {/* Heading */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        Register <span className='text-purple-600'>Chat App</span>
                    </h1>
                    <p className='text-gray-500 mt-2'>
                        create your account to contniue
                    </p>

                </div>
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className='flex items-center gap-3'>
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Full Name :
                        </label>
                        <input id='fullname'
                            type="text"
                            required
                            placeholder='Enter Full Name'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600' />

                    </div>
                    {/* User Name */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            User Name :
                        </label>
                        <input id='username'
                            type="text"
                            required
                            placeholder='Enter User Name'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600' />

                    </div>
                    </div>
                    {/* Email */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email Address :
                        </label>
                        <input id='email'
                            type="email"
                            required
                            placeholder='Enter Email'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600' />

                    </div>
                    {/* password */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password :
                        </label>
                        <input id='password'
                            type="password"
                            required
                            placeholder='Enter Password'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600' />

                    </div>
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Confirm Password :
                        </label>
                        <input id='confpassword'
                            type="password"
                            required
                            placeholder='Enter Confirm Password'
                            onChange={handleInput}
                            className='w-full h-10 border border-gray-500 rounded-xl outline-none px-2 focus:border-purple-600' />

                    </div>
                    {/* Gender */}
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            <span>Gender:</span>
                        </label>
                        <div className="flex gap-4">
                            <div
                                onClick={() => selectGender("male")}
                                className={`w-1/2 h-10 border rounded-xl flex justify-center items-center cursor-pointer
            ${inputData.gender === "male"
                                        ? "border-purple-600 bg-purple-100 text-purple-600"
                                        : "border-gray-500"
                                    }`}
                            >
                                Male
                            </div>

                            <div
                                onClick={() => selectGender("female")}
                                className={`w-1/2 h-10 border rounded-xl flex justify-center items-center cursor-pointer
            ${inputData.gender === "female"
                                        ? "border-purple-600 bg-purple-100 text-purple-600"
                                        : "border-gray-500"
                                    }`}
                            >
                                Female
                            </div>
                        </div>
                    </div>
                    {/* Login button */}
                    <button type='submit'
                        className='w-full h-12 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition'>
                        {loading ? "Loding..." : "Register"}
                    </button>


                </form>
                {/* Register */}
                <p className='text-center text-sm text-gray-500 mt-6'>
                    already you have account{' '}
                    <Link to='/login'>
                        <span className='text-purple-600 font-semibold cursor-pointer'>
                            Login
                        </span>
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default Register1