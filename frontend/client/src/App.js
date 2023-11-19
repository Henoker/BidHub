import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'; 
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import AuthMiddleware from './middleware/Auth';
import User from './pages/auth/User';
import Navbar from './components/Navbar';
import PersistLogin from './components/PersistLogin';


const App = () => {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<PersistLogin/>} />
      <Route index exact element={<Home />} />
      <Route path='/auth'>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register />} />
        <Route path='user' element={<AuthMiddleware />}>
          <Route index element = {<User />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    </>
    
    

          
   
    
        )
  
}

export default App