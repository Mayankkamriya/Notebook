import React from 'react'
import './component.css'

const About = () => {
  


  return (

    //     <div className='container my-2' >About </div>
    <div className="about-container">
      <header className="about-header">
        <h1>About iNotebook</h1>
        <p>Your digital notebook for all your notes and ideas.</p>
      </header>

      <section className="about-section">
        <h2>What is iNotebook?</h2>
        <p>iNotebook is a secure, easy-to-use note-taking application where you can store, edit, and manage your notes efficiently. Whether you're a student, professional, or just someone who loves organizing their thoughts, iNotebook is here to help.</p>
      </section>

      <section className="about-section">
        <h2>Key Features</h2>
        <ul>
          <li>Secure login with JWT authentication and encrypted password storage.</li>
          <li>Easy-to-use interface for creating, editing, and managing notes.</li>
          <li>Tagging system for better organization of notes.</li>
          <li>Accessible from any device with internet connectivity.</li>
         </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose iNotebook?</h2>
        <p>iNotebook provides a seamless and secure experience for users who want to keep their notes in one place. With an intuitive design, powerful features, and robust security measures, iNotebook ensures your data is safe and accessible anytime, anywhere.</p>
      </section>

      <section className="about-section">
        <h2>Who Is It For?</h2>
        <ul>
          <li><strong>Students:</strong> Store and manage lecture notes, assignments, and more.</li>
          <li><strong>Professionals:</strong> Organize your project ideas, to-do lists, and meeting notes.</li>
          <li><strong>Everyone:</strong> From grocery lists to creative brainstorming, iNotebook is for anyone looking to stay organized.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Security & Privacy</h2>
        <p>Your privacy is our top priority. All your notes are securely encrypted and can only be accessed by you. We use industry-standard security measures to ensure your data is safe.</p>
      </section>

      <footer className="about-footer">
        <p>Have any questions or feedback? Contact Us : kamriyamayank45@gmail.com</p>
      </footer>
    </div>
  );
};



export default About;