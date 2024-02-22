import { response } from 'express';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function Signup() {


  const [formData, setFormData] = useState({
    firstName:" ",
    lastName:" ",
    userName:" ",
    password:" ",
    confirmPassword:" "
  })

  const {firstName, lastName, userName, password, confirmPassword} = formData;

  const handleChange = (e)=>{
    const {name, value} = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if(password !== confirmPassword){
      console.error("Password and confrim password do not match");
      return;
    }
  }
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [userName, setUserName] = useState();
  // const [password, setPassword] = useState();



  
    const userData = {
      firstName,
      lastName,
      userName,
      password,
    }

    fetch("http://localhost:8000/api/users",{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userData)
    }).then(response=>{
      if(!response.ok){
        throw new Error('Failed to fetch');
      }
      return response.json();
    }).then((data)=> {
      console.log("new user added",data)
    })
    .catch(error =>{
      console.error("error occured",error)
    })
  

  
  return (
    <div>
      <div className='container  mt-4  '>
      <form onSubmit={handleSubmit} className='border-1 border-dark  rounded-1 d-lg-grid d-md-block d-sm-grid  justify-content-center align-items-center'>
          <label >First Name</label>
          <input 
          type='text' 
          name='firstName'  
          value={firstName}
          onChange={handleChange}
          />

          <label>Last Name</label>
          <input 
          type='text'
          required 
          name="lastName" 
          value={lastName}
          onChange={handleChange}
          />

          <label>User Name</label>
          <input 
          type='text' 
          required
          name="userName" 
          value={userName}
          onChange={handleChange}
          />

          <label>Password</label>
          <input 
          type='password'
          required
          name='password'
          value={password}
          onChange={handleChange}
          />
          <label>Confirm Password</label>
            <input 
            type='password'
            required
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
          />
          <button className='btn btn-primary'>Submit</button>
          <div> 
          <span>if you have an account?</span>
          <Link to='/login' className='d-lg-block d-flex '>Login</Link>
          </div>          
      </form>
    </div>
    </div>
  )
}
