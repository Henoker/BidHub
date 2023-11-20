import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ActivatePage from './pages/ActivatePage';



const App = () => {

  return (
    <>
    <Router>
      <Navbar />
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/activate/:uid/:token" element={<ActivatePage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path='*' element={<NotFoundPage />} />

    </Router>
    </>
    
    

          
   
    
        )
  
}

export default App