import React, { useState } from 'react';
import "../loginPage/Login.css";
import H1 from "../../images/H1.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  


  // State variables to hold the values of login and password inputs
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const Navigator = useNavigate();

  const handleToSignupPage = () => {
    Navigator("/signupPage");
  }

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const initialfetchApi = async () =>{
      try{
          const res = await axios({
            url: 'http://localhost:8000/hawker/login',
            method: 'post',
            headers:{
              "content-type":"application/json"
            },
            data: {
              email: login,
              password: password
            }
          })
          if(res.data.flag == true)
          {
            localStorage.setItem('email', login);
            Navigator("/hawkerHome")
          }
          else
          {
            alert("wrong credentials");
          }
      }catch(err){
        console.log(err)
      }
    } 
    initialfetchApi();
  };

  return (
    <div className="container-login bg-orange-200">
      <div className="image-container-login">
          <img src={H1} alt="Hawker Image" width="500" height="500" />
      </div>
      <div className="form-container-login bg-orange-300">
        <h2 className='text-white font-bold'>WELCOME TO THE HAWKERS</h2>
        <form onSubmit={handleSubmit}> 
          <div className="form-group-login"> 
            {/* <label htmlFor="login">Login</label> */}
            <input
            placeholder="username"
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="form-group-login">
            {/* <label htmlFor="password">Password</label> */}
            <input
            placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-login bg-orange-400" type="submit" onClick={handleSubmit} >Login</button>
          <button className="btn-login bg-orange-400" type="submit" onClick={handleToSignupPage}  >Register</button>
        </form>
      </div>
    </div>
  );
}

export default Login;