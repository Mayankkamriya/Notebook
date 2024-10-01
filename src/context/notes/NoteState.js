
              // frontend requests

import { useState } from "react";
import NoteContext from "./noteContext";
import {useNavigate}  from 'react-router-dom';
import Alert from '../../components/Alert';
import '../../components/component.css'

const NoteState = (props)=>{

  const [alertmessage, setAlertMessage] = useState({ message: '', type: '' }); 
  let Navigate = useNavigate();

  const host = "http://localhost:5000"

    const NotesInitial =[]
      const [notes, setNotes] = useState(NotesInitial);

     // Fetch all note
     const getnote=  async()=>{
      // API call 
const response = await fetch(`${host}/api/notes/fetchallnotes`, {
method: "GET",
headers: {
  "Content-Type": "application/json",
  "auth-token" : localStorage.getItem('token')
},  })

const json = await response.json();
// console.log(json)
setNotes(json)
  }
     
      //Add note
      const addnote=  async({title,description,tag})=>{
          // API call 
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag})
})
        const note = await response.json();
          setNotes(notes.concat(note))
      }

   //delete note 
   const deletenote = async (id) => {
         // Make a DELETE request to your backend
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
             method: 'DELETE',
             headers: {
               'Content-Type': 'application/json',
               "auth-token" : localStorage.getItem('token')
             },
         });
         if(response.ok){
   const newnote =notes.filter((note)=>{ return note._id!==id})
     setNotes(newnote);
     setAlertMessage({ message: 'Note Deleted successful', type: 'success' })
     setTimeout(() => {
      setAlertMessage({ message: '', type: '' }); 
       Navigate('/');
     }, 1200);

       } else {
         alert("Failed to delete the note")
         console.error('Failed to delete the note');
       }
     }

      // Edit note
      const editnote = async (id, title, description, tag) => {
      
        try {
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
          });
          
          const updatedNote = await response.json();
      
          if (response.ok) {
            setNotes(prevNotes => 
              prevNotes.map(note => 
                note._id === id ? updatedNote : note
              )
            );
            setAlertMessage({ message: 'Note Edited successful', type: 'success' })
            setTimeout(() => {
              setAlertMessage({ message: '', type: '' }); 
              Navigate('/');
            }, 1200);
          } else {
            // console.error('Failed to update the note. Server response:', updatedNote);
          }
        } catch (error) {
          console.error('Error updating note:', error);
        }
      };
     

    return (
      <> {alertmessage.message && (
      <div className="alert-fixed "><Alert  
      message={alertmessage.message} type={alertmessage.type } />
      </div> )}

        <NoteContext.Provider value={{notes,setNotes,addnote,editnote,deletenote,getnote}}>
            {props.children}
        </NoteContext.Provider>

        </> )}

export default NoteState;

