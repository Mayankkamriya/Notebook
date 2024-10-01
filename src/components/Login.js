import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';
import './component.css'

const Login = () => {

    const [credential, setcredential] = useState({email:"",password:""}); 
    const [alertmessage, setAlertMessage] = useState({ message: '', type: '' }); 
    let Navigate = useNavigate();
    
    const onchange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value }) //By this all the values remain as it is except whose name we have assigned Whatever is changing that's name become equals to that value   OR jo bhi change ho raha hai uska name uski value ke barabar ho jaye
      }

  const handlesubmit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credential.email, password:credential.password})  })
      
      const json = await response.json();
    //   console.log(json)
      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.token);

        setAlertMessage({ message: 'Login successful', type: 'success' })
      setTimeout(() => {
        Navigate('/');
      }, 1200);

      } else {
        // alert("invalid credential")
        setAlertMessage({ message: 'Wrong credential', type: 'danger' })
        setTimeout(() => {
          Navigate('/Login');
        }, 1500);
      } }
    

  return (<>
 {alertmessage.message && (
  <div className="alert-fixed "><Alert  
  message={alertmessage.message} type={alertmessage.type } />
  </div> )}


  <div className='mt-4'>
<h2 className='container'>Login to continue to Notebook</h2>
  <form className='container my-3' onSubmit={handlesubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label" value={credential.email}>Email address</label>
      <input type="email" className="form-control" id="email" onChange={onchange} name="email" aria-describedby="emailHelp"/>
     </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label" value={credential.password}>Password</label>
      <input type="password" className="form-control" id="password" onChange={onchange} name="password"/>
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
  </form>

  <div className='d-flex'>
  <h4 className='container ' >Don't have Account 
    <Link type="submit" to="/signUp" className=" mx-2" >Create an account</Link></h4>
 </div>

 </div>
 
 </> )
}

export default Login;