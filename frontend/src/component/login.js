import React from 'react'
import { Link } from 'react-router-dom'
// import Signup from './signup'

export default function LogIn() {


  return (
    <div className='container  mt-4  '>
      <form className='border-1 border-dark  rounded-1 d-lg-grid d-md-block d-sm-grid  justify-content-center align-items-center'>
          <label >UserName</label>
          <input type='text' name='username'  />
          <label>Password</label>
          <input type='password' name='email'/>
          <button className='btn btn-success'>LogIn</button>
          <div> 
          <span>don't have an account?</span>
          <Link to='/signup' className='d-lg-block d-flex '>Signup</Link>
          </div>
          
      </form>
    </div>
  )
}
