import React,{ useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import { Toaster } from "react-hot-toast";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Summary } from "./pages/Summary.jsx";
import { Home } from "./pages/Home.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check for access token in localStorage
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
    else{
      localStorage.removeItem('accessToken')
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  return (
    <Router> {/* Wrap your App component with BrowserRouter */}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'blue',
              color: 'white',
              width: 'auto'
            },
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
            },
            iconTheme: {
              primary: 'black',
              secondary: 'white',
            },
          },
        }} />
      <Routes>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/summarizer' element={<Summary isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default App;
