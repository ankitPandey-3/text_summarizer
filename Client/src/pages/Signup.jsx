import React,{ useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export function Signup() {
  const [errMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      fullName: event.target.fullName.value,
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value
    }
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/signup', formData);
      console.log(response);
      if (response.data.statusCode === 200) {
        setErrorMessage('');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage('!!' + error.response.data.message);
      } else {
        setErrorMessage('An error occurred while processing your request.');
      }
    }

  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:flex justify-center items-center bg-yellow-500">
        <img
          src="\image-modified.png"
          alt="Placeholder Image"
          className="object w-auto h-auto"
        />
      </div>
      {/* Right: sign up Form */}
      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 class="text-3xl font-bold mb-4 mr-4 font-serif md:text-4xl md:mr-8">Text Summarizer</h1>
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              placeholder='Full Name'
            />
          </div>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              placeholder='username'
            />
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              placeholder='example@example.com'
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              placeholder='password'
            />
          </div>
          {/* Register Button */}
          <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md py-2 px-4 w-full">
            Sign Up
          </button>
        </form>
        {/* Sign up Link */}
        <div className="mt-6 text-yellow-600 text-center">
          <a href="/login" className="hover:underline">
            Already have an account?
          </a>
        </div>
        <h2 className="mt-6 text-yellow-600 text-center">{errMessage}</h2>
      </div>
    </div>
  );
};

