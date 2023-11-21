import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ActivatePage from './pages/ActivatePage';
import ResetPasswordPageConfirm from './pages/ResetPasswordPageConfirm';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const App = () => {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/activate/:uid/:token" element={<ActivatePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordPageConfirm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
    
    

          
   
    
        )
  
}

export default App