import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import { ToastContainer} from 'react-toastify';
import VerifyEmail from './components/VerifyEmail';
import LoginPage from './components/LoginPage';

const App = () => {

  return (
          <Router>
            <ToastContainer />
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/register' element={<RegisterPage/>} />
                <Route path='/otp/verify' element={<VerifyEmail/>} />
                <Route path='/login' element={<LoginPage />} />
              </Routes>
          </Router>
   
    
        )
  
}

export default App