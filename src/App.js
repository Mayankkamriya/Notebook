import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

  
function App() {

  return (
    <>
<NoteState>
      <Router>
        <React.StrictMode> 
          <Navbar />
          <Alert message="Welcome to iNotebook" />
          <div className="container">
          <Routes> {/* Wrap routes inside Routes */}
            <Route exact path="/" element={<Home />} /> {/* Home route */}
            <Route exact path="/Navbar" element={<Navbar />} /> {/* About route */}
            <Route exact path="/About" element={<About />} /> {/* About route */}
          </Routes>
          </div>
         </React.StrictMode>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

