import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { setUser } from '../redux/features/auth/authSlice';

const Login = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [loginUser, {isLoading: loginloading}] = useLoginUserMutation()
  const navigate = useNavigate();

  //handle login
  const handleLogin = async (e) =>{
    e.preventDefault();
    const data={
    email,
    password
    }
    try {
      const response =await loginUser(data).unwrap();
      console.log(response)
      const {token, user} = response;
      dispatch(setUser({user}))
      alert('login sucessful')
      navigate("/")
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  }

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm border shadow bg-white mx-auto p-8'>
        <h2 className='text-2xl text-font-semibond pt-5'>Please Login</h2>
        <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto px-8'>
          <input type="email" id='email' name='email' 
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Address' required
          className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />
          <input type="password" id='password' name='password' 
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password' required
          className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />
          {
            message && <p className='text-red-500'>{message}</p>
          }
          <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'>
            Login
          </button>

        </form>
        <p className='my-5 italic text-sm text-center'>Don't have an account?<Link to="/register" className='text-blue-500 px-1 underline'> Register </Link> here.</p>
      </div>
    </section>
  )
}

export default Login
