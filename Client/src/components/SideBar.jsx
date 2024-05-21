import React, {useState, useEffect} from 'react';
import { Settings, LogOut, Layers, Archive, Server, Cpu, Brain, Menu} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';

export function SideBar ({setIsLoggedIn}) {
  const [onClick, setOnClick] = useState(false);
  const [name, setName] = useState(localStorage.getItem('user'))
  const navigate = useNavigate();
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setOnClick(true);
    } else {
      setOnClick(false);
    }
  }

  const handleLogout = async() => {
   
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/logout',{},{
        withCredentials: true
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      if (response.data.statusCode === 200) {
        toast.success('Logged Out SuccessFully')
        navigate('/');
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <>
    <Menu onClick={() => setOnClick(!onClick)} className='lg:hidden fixed top-0'/>
    <aside className={onClick ? "fixed h-screen w-64 flex flex-col overflow-y-auto border-r bg-yellow-400 px-5 py-8" : "hidden"}>
      <a href="/" >
        <img src="\image-modified.png" alt="" className='w-auto h-auto border-none rounded-full border-2' />
      </a>

      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-2xl font-semibold uppercase text-white">{name}</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="/change-password"
            >
              <Settings className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-l font-medium">Change Password</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-l font-medium">Logout</span>
            </a>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xl font-semibold uppercase text-white">Summarizer</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="/summarizer"
            >
              <Layers className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-l font-medium">Summarizer Tool</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="/"
            >
              <Archive className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-l font-medium">Saved</span>
            </a>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xl font-semibold uppercase text-white">Technologies</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="#"
            >
              <Server className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-l font-medium">Web Application</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="#"
            >
              <Cpu className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-l font-medium">Transformer</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
    </>
  )
}
