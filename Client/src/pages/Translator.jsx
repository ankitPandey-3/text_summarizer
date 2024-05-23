import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SideBar } from "../components/SideBar";
import { Copy } from 'lucide-react'
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

export const Translator = ({ isLoggedIn, setIsLoggedIn }) => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [change, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        text: inputText // using the state variable directly
      };
      const response = await axios.post("http://localhost:8000/api/v1/tool/translate", formData, {
        withCredentials: true
      });
      console.log(response.data.data)
      setSummary(response.data.data.generatedText.text); // Assuming the response contains a 'summary' field
    } catch (error) {
      toast.error("Some error occured")
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setChange(true);
    } else {
      setChange(false);
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

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(summary);
    toast.success("Copied")
  })

  const handleSave = async (event) => {
    event.preventDefault();
    const formData = {
      inputText: inputText,
      generatedText: summary
    }
    try {
      const response = await axios.post("http://localhost:8000/api/v1/summ/summarizer/save", formData, {
        withCredentials: true
      })
      if(response.data.statusCode === 201){
        toast.success("Saved");
      }
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      {isLoading ? (
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
      ) : (
        // Conditional rendering based on login status
        <div className={isLoggedIn ? "flex" : ""}>
          <div className=' w-auto lg:w-64 '>
            {change&&isLoggedIn ? <SideBar setIsLoggedIn={setIsLoggedIn} /> : <></>}
          </div>
          <div className='w-full lg:w-11/12 '>
            {isLoggedIn ? (
              <div className="container w-full">
                {/* Header */}
                <header className="flex justify-between items-center mb-8 w-full py-4 px-4 bg-yellow-400 border-none">
                  {/* Length control */}
                  <div>
                    {/* Conditional rendering based on 'change' state */}
                    {change ? (
                      <div>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={length}
                          className="cursor-pointer ml-6 hidden"
                          onChange={(e) => {
                            setLength(e.target.value);
                          }}
                          style={{
                            accentColor: "blue",
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-white text-base lg:text-xl">
                          {length}
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={length}
                          className="cursor-pointer ml-4"
                          onChange={(e) => {
                            setLength(e.target.value);
                          }}
                          style={{
                            accentColor: "blue",
                            width: "70px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* Action buttons */}
                  <div className="flex items-center">
                    <button
                      className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded self-center"
                      onClick={handleCopy}>

                      <Copy className="h-5 w-5" aria-hidden="true" />
                    </button>

                    {/* <button
                      className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-center"
                      onClick={handleSave}>
                      <Save className="h-5 w-5" aria-hidden="true" />
                    </button> */}
                  </div>
                </header>
                {/* Main content */}
                <div className="">
                  <div className="md:flex md:items-center">
                    <form
                      onSubmit={handleSubmit}
                      className="w-full flex flex-col items-center"
                    >
                      <textarea
                        className="w-3/4 h-96 px-3 py-2 border rounded mb-4 font-serif text-orange-800 lg:ml-14 mr-2 ml-4"
                        placeholder="Add your text here"
                        id="inputText"
                        name="inputText"
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-center"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div>
                    <div className=" w-full flex flex-col items-center">
                      <textarea
                        className="w-3/4 h-96 px-3 py-2 border rounded mb-4 font-serif text-orange-800 lg:ml-14 mr-2 mt-4 ml-4"
                        placeholder="summary will appear here after some time ..."
                        value={summary}
                        >
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
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
            )}

          </div>

        </div>
      )}
    </div>

  );
};
