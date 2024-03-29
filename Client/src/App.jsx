import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { Summary } from "./pages/Summary.jsx";
import { Home } from "./pages/Home.jsx";

function App(){
  return(
    <Router> {/* Wrap your App component with BrowserRouter */}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/summarizer' element={<Summary />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
