import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import VerifyEmail from './components/VerifyEmail';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App = () => {

  return (
          <Router>
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/register' element={<RegisterPage/>} />
                <Route path='/otp/verify' element={<VerifyEmail/>} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/dashboard' element={<DashboardPage/>}/>
              </Routes>
          </Router>
   
    
        )
  
}

export default App