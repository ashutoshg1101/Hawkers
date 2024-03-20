import React from 'react'
import './signupPage.css'
import { useNavigate } from 'react-router-dom';
const Loginform = () => {
  const Navigator = useNavigate();
  function toLoginPage(){
    Navigator("/loginPage");
  }
  return (
    <div className='containerSignup bg-orange-200'>
      <div className='wrapperSignup bg-orange-300'>
      <h1 id='heading-signup'>Sign up for New user's</h1>
      <form>
        <div className='input-box-signup'>
          <label>
            FirstName:
           <input type="text" placeholder='' required/>
           </label>
        </div>

        <div className='input-box-signup'>
        <label>
            LastName:
           <input type="text" placeholder='' required/>
           </label>
        </div>
       <div className='input-box-signup'>
       <label>
          Gender: 
        </label>
        <label ><input type='radio' name="male"/>Male</label>
        <label  ><input type='radio' name="male"/>Female</label>
        <label ><input type='radio' name="male" />Others</label>
       </div>
        
       <div className='input-box-signup'>
          <label>
            Age:
           <input type="number" placeholder='' required/>
           </label>
        </div>
        
       <div className='input-box-signup'>
          <label>
            Adress:
           <input type="text-field" placeholder='' required/>
           </label>
        </div>

        <div className='input-box-signup'>
          <label>
            Phone No:
           <input type="number" placeholder='' required/>
           </label>
        </div>


        <div className='input-box-signup'>
          <label>
            Adhar Number:
           <input type="Number" placeholder='' required/>
           </label>
        </div>
         
        <div className='input-box-signup'>
          <label>
            Email:
           <input type="Email" placeholder='' required/>
           </label>
        </div>


        <div className='input-box-signup'>
          <label>
            Password:
           <input type="password" placeholder='' required/>
           </label>
        </div>
        

        <div className="Button-box-signup bg-orange-400">
        <button type="submit" onClick={toLoginPage}>Submit</button>
        </div>
        

      </form>
      
    </div>
    </div>
  );
};

export default Loginform
