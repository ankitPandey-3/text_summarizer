import React,{ useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import { Toaster } from "react-hot-toast";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Summary } from "./pages/Summary.jsx";
import { Home } from "./pages/Home.jsx";
import { View } from "./pages/View.jsx";
import { ChangePassword } from "./pages/ChangePassword.jsx";
import { Translator } from "./pages/Translator.jsx";
import axios from "axios";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const validateAccessToken = async () => {
      try {
        // Make a request to validate the access token
        const response = await axios.post('http://localhost:8000/api/v1/auth/validate-token',{}, { withCredentials: true });
        if (response.data.statusCode === 200) {
          
          setIsLoggedIn(true);
          console.log('Access token is valid');
        } else {
          await refreshToken();
        }
      } catch (error) {
        console.error('Error validating access token:', error);
        setIsLoggedIn(false)
      }
    };

    const refreshToken = async () => {
      try {
        // Make a request to refresh the access token
        const response = await axios.post('http://localhost:8000/api/v1/auth/refresh-token',{}, { withCredentials: true });
        setIsLoggedIn(true);
        if (response.data.statusCode === 200) {
          // Update the access token in local storage or wherever you want to store it
          
          console.log('Access token refreshed');
        } else {
          // If refresh token is not valid, set a local storage variable to false
          setIsLoggedIn(false);
          console.log('Refresh token is not valid');
        }
      } catch (error) {
        console.error('Error refreshing access token:', error);
        setIsLoggedIn(false);
      }
    };

    // // Call validateAccessToken when the component mounts
    validateAccessToken();
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
        <Route path='/translator' element={<Translator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/summarizer/:title' element={<View isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/change-password' element={<ChangePassword isLoggedIn={isLoggedIn}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
