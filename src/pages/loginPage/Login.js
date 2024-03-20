import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const Navigator = useNavigate();

  function toMapComponent(){
    Navigator("/mapComponent");
  }

  function toSignupPage(){
    Navigator("/signupPage")
  }

  return (
    <div className='containerLogin bg-orange-200'>
      <div className='wrapper bg-orange-300'>
        <form action="">
            <h1 className='text-black font-bold'>Welcome To Hawkers</h1>
        <div className="input-box">
          <input type="text" placeholder='username' required />  
        </div>


        <div className="input-box">
          <input type="Password" placeholder="password" required />  
        </div>

        <div className="remember-forgot">
            <label><input type="checkbox"/> Remember me</label>
            <a href="#">Forgot password?</a>
        </div>

        <div className="Button-box">
        <button className='bg-orange-400' type="submit" onClick={toMapComponent}>Login</button>
        </div>
        <div className="Button-box">
        <button className='bg-orange-400' type="submit" onClick={toSignupPage}>Signup</button>
        </div>
        
        
        {/* <div className="register-link">
            <p> Don't have an account?<button className='remember-forgot'>Register</button></p>
        </div> */}
        </form>
      
    </div>
    </div>
  );
};

export default Login

