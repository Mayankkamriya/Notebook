import React,{  useEffect} from 'react'
import { Link,useLocation, useNavigate } from "react-router-dom";

const Navbar = ({userName}) => {

  let location = useLocation(); // our main aim by doing this is when we click on item in Navbar only that item should highlight.
 
  let Navigate = useNavigate();
 const handleLogout=() => {
  localStorage.removeItem('token')
  Navigate('/Login');
  }

  useEffect(() => {
    // console.log(location.pathname) // In console the path is printed by this
  }, [location]);

  return (<>
  
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NoteBook</Link>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/Home" ? "Active": ""}` } aria-current="page" to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/About" ? "Active": ""}`} to="/About">About</Link>
        </li>
     
   {/*  //For Normal Fornt same as other Navbar item */}
       {/* <li className="nav-item" style={{color:"white"}}>
          <span className="nav-link">
           Welcome {userName ? userName : "Guest"}
          </span>
        </li> */}
        
       <li className="nav-item nav-link" style={{color:"white"}}>
           Welcome {userName ? userName : "Guest"}
        </li>
    
    </ul>

      { !localStorage.getItem('token') ?
      <form className="d-flex" >
      <Link type="button" to="/Login" className="btn mx-1 btn-primary">Login</Link>
      <Link type="button" to="/SignUp" className="btn mx-1 btn-primary">SingUp</Link>
      </form>:
      <button onClick={handleLogout} type="button"  className="btn mx-1 btn-primary">Logout</button>
      }
     
        
    </div>
  </div>
</nav>

  </> 
  )
}

export default Navbar