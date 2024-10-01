import React, { useState, useEffect} from 'react'
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';

  
function App() {

  const [userName, setUserName] = useState('');

  // useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      const userData = await response.json();
      if (userData.name) {
        console.log(userData); 
        setUserName(userData.name);
      }
    };

    const handleLogin = async () => {
      await getUserDetails();}
  // }, []);


  return (
    <>
      <Router>
<NoteState>
        <React.StrictMode> 
          <Navbar userName={userName} />

       <div className="alert-fixed" ><Alert 
       message="Welcome to Notebook" type='success'/> </div> 

          <Routes> {/* Wrap routes inside Routes */}
            <Route exact path="/" element={<Home />} /> {/* Home route */}
            <Route exact path="/Navbar" element={<Navbar />} /> {/* About route */}
            <Route exact path="/About" element={<About />} /> {/* About route */}
            <Route exact path="/Login" element={<Login onLogin={handleLogin} />}/>
            <Route exact path="/SignUp" element={<SignUp />} />
          </Routes>
         </React.StrictMode>
      </NoteState>
        </Router>
    </>
  );
}

export default App;

