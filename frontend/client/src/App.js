import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'; 
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import VerifyEmail from './components/VerifyEmail';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import PasswordResetRequest from './components/PasswordResetRequest';
import ResetPassword from './components/ResetPassword';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth'>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    

          
   
    
        )
  
}

export default App