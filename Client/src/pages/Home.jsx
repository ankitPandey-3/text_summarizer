import React from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    function handleClick(e){
        e.preventDefault();
        if(e.target.id === "signup"){
            navigate('/signup');
        }
        else if(e.target.id === 'login'){
            navigate('/login');
        }
    }
    return (
        <div className="bg-gray-100 flex gap-10 md:gap-0 md:justify-center flex-col md:flex-row items-center h-screen">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 md:max-lg:hidden md:h-screen lg:flex justify-center items-center bg-yellow-400 p-10 ">
          <img
            src="\image-modified.png"
            alt="Placeholder Image"
            className="object w-auto h-auto border-white rounded-full border-4 "
          />
        </div>
            {/* Right: sign up Form */}
            <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2 flex flex-col justify-center items-center ">
                <h1 className="text-2xl font-bold mb-4 font-serif md:text-4xl">
                    Text Summarizer
                </h1>
                <div className="flex flex-col lg:flex-row gap-4">
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-md py-2 md:py-4 px-10 md:px-16 w-full lg:w-auto text-white text-base md:text-xl font-serif lg:whitespace-nowrap"
                        id="signup"
                        onClick={handleClick}
                    >
                        Sign Up
                    </button>
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-md py-2 md:py-4 px-10 md:px-16 w-full lg:w-auto mt-4 lg:mt-0 text-white text-base md:text-xl font-serif"
                        id="login"
                        onClick={handleClick}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
