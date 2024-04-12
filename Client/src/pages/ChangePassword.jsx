import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Home } from 'lucide-react';
import { RotatingLines } from "react-loader-spinner";


export function ChangePassword({isLoggedIn}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      oldPassword: event.target.oldPassword.value,
      newPassword: event.target.newPassword.value
    }
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/change-password', formData,{
        withCredentials: true
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    // Simulate loading delay (you can adjust the delay time as needed)
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup function to clear the timeout if component unmounts or changes
    return () => clearTimeout(delay);
  }, []);



  return (
    <div>
        {
            isLoading ? (
                <div className="flex items-center justify-center h-screen ">
                  {/* Loader component */}
                  <RotatingLines
                    visible={true}
                    height="96"
                    width="96"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : 
            (<div>
            {
            !isLoggedIn ?   (
                  // Error message for unauthorized users
                  <div className="flex items-center justify-center h-screen">
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-col justify-center items-center"
                      style={{ height: " 200px", width: "400px", fontSize: "20px" }}
                    >
                      <h1 className="font-bold " style={{ fontSize: "30px" }}>
                        Error: 401 Bad Request
                      </h1>
                      <h2 className="font-semibold">You are not authorized</h2>
                    </div>
                  </div>
                ): (<div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
              <h1 className="text-3xl font-bold mb-4 mr-4 font-serif md:text-4xl md:mr-8">Text Summarizer</h1>
              <h1 className="text-2xl font-semibold mb-4">Login</h1>
              <form onSubmit={handleSubmit}>
                {/* Username Input */}
                <div className="mb-4">
                  <label htmlFor="old_Password" className="block text-gray-600">
                    Old Password
                  </label>
                  <input
                    type="text"
                    id="oldPassword"
                    name="oldPassword"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    autoComplete="off"
                    placeholder='Old Password'
                  />
                </div>
                {/* Password Input */}
                <div className="mb-4">
                  <label htmlFor="new_password" className="block text-gray-600">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    autoComplete="off"
                    placeholder='New Password'
                  />
                </div>
                {/* Login Button */}
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md py-2 px-4 w-full">
                  Change
                </button>
              </form>
              <div className="mb-6 text-yellow-600 mt-3">
                <a href="/" className="hover:underline">
                  <Home />
                </a>
              </div>
            </div>
          </div>)
        }
        </div>)
        }
    </div>
    
    
  );
};

