import React from 'react';
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

  return (
    <>
      <Router>
<NoteState>
        <React.StrictMode> 
          <Navbar />

       <div className="alert-fixed" ><Alert 
       message="Welcome to Notebook" type='success'/> </div> 

          <Routes> {/* Wrap routes inside Routes */}
            <Route exact path="/" element={<Home />} /> {/* Home route */}
            <Route exact path="/Navbar" element={<Navbar />} /> {/* About route */}
            <Route exact path="/About" element={<About />} /> {/* About route */}
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/SignUp" element={<SignUp />} />
          </Routes>
         </React.StrictMode>
      </NoteState>
        </Router>
    </>
  );
}

export default App;

