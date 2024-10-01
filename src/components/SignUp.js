import React,{useState} from 'react'
import {Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';

// const User = require('../models/User')
const SignUp = () => {

    const [credential, setcredential] = useState({email:"",name:"",password:"",cpassword:""}); 
    const [alertmessage, setAlertMessage] = useState({ message: '', type: '' }); 
    let Navigate = useNavigate();

    const onchange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value }) //By this all the values remain as it is except whose name we have assigned Whatever is changing that's name become equals to that value   OR jo bhi change ho raha hai uska name uski value ke barabar ho jaye
      }

  const handlesubmit = async(e) => {
    e.preventDefault();
    const {name,email,password,cpassword}= credential;

    if (password !== cpassword) {
        alert('Passwords do not match');
        return;
      }

    //   let user = await User.findOne({email: req.body.email});
    //   /*console.log(user); */
    //   if(user){         //If user already exists it return sorry a user....
    //     return res.status(400).json({ error: "sorry a user with this email already exist"})
    // }

    
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email ,name, password})  
    })
      
      const json = await response.json();
      // console.log(json)

      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.token);
        setAlertMessage({ message: 'Account created successful', type: 'success' })
        setTimeout(() => {
          Navigate('/');
        }, 1200);
      } else {
          alert("invalid credential")
      } }
    

  return (<>
    {alertmessage.message &&(
      <div className="alert-fixed"><Alert  
    message={alertmessage.message} type={alertmessage.type} />
    </div>) }

  <div className='container mt-4'>
 <h2 className='my-3'>Create an account to use Notebook</h2>
    <form className='container my-3' onSubmit={handlesubmit}>
    <div className="my-3">
      <label htmlFor="name" className="form-label" >Name</label>
      <input type="text" className="form-control" id="name" onChange={onchange} minLength={3} required name="name" aria-describedby="emailHelp"/>
     </div>
     <div className="mb-3">
      <label htmlFor="email" className="form-label" >Email address</label>
      <input type="email" className="form-control" id="email" onChange={onchange} name="email" aria-describedby="emailHelp"/>
     </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label" >Password</label>
      <input type="password" className="form-control" id="password" onChange={onchange} minLength={4} required name="password"/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label" >Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" onChange={onchange} minLength={4} required name="cpassword"/>
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
  </form>
  <div className='d-flex'>
  <h4 className='container ' >Already have an Account 
    <Link type="submit" to="/Login" className=" mx-2" >Login</Link></h4>
 </div>
 </div>
 </> )
}
export default SignUp