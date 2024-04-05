import React from 'react';
import LoginComponent from './Component/LoginComponent'; // Importing the LoginComponent
import SignupComponent from './Component/SignupComponent'; // importing Signupcomponent
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotComponent from './Component/ForgotComponent';
import MenuComponent from './Component/MenuComponent';
import ChangePasswordComponent from './Component/ChangePasswordComponent';
function App() {
  return (
    

    <BrowserRouter>
    <div className='flex flex-col h-full'>
      <Routes>
      <Route path='/' exact element={<LoginComponent/>}/>
        <Route path='/register' exact element={<SignupComponent/>}/>
        <Route path='/forgot' exact element={<ForgotComponent/>}/>
        <Route path='/changepassword' exact element={<ChangePasswordComponent/>}/>
        <Route path='/Home' exact element={<MenuComponent/>}/>

      </Routes>
    </div>
    
      </BrowserRouter>
  );
}

export default App;
