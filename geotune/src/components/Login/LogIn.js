import {React, useState} from 'react';
import Form from './Form';
import "../../App.css"

function Login(onLogin) {
  

  return (
  <div className='bg-black/50 h-screen absolute left-0 top-0 w-screen z-10 flex justify-center items-center'>
   
   <Form onLogin={onLogin.onLogin} >
   
   </Form>
  
   
  </div>
  );
}

export default Login;
