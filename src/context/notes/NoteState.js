import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
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
  "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlOTZhNjE1MjU5MTMxY2Q2ZmUyMWEzIn0sImlhdCI6MTcyNjU3MzE1M30.SNW6cwF2_JeOb5AeSMPwVG7_j616Gd5UtAmxH8McRAQ",
},  })

const json = await response.json();
console.log(json)
setNotes(json)
  }
     
      //Add note
      const addnote=  async({title,description,tag})=>{
          // API call 
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlOTZhNjE1MjU5MTMxY2Q2ZmUyMWEzIn0sImlhdCI6MTcyNjU3MzE1M30.SNW6cwF2_JeOb5AeSMPwVG7_j616Gd5UtAmxH8McRAQ",
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
                    "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlOTZhNjE1MjU5MTMxY2Q2ZmUyMWEzIn0sImlhdCI6MTcyNjU3MzE1M30.SNW6cwF2_JeOb5AeSMPwVG7_j616Gd5UtAmxH8McRAQ",
                },
            });
            if(response.ok){
      // const deletenote=(id)=>{
      const newnote =notes.filter((note)=>{ return note._id!==id})
        setNotes(newnote);
} else {
    console.error('Failed to delete the note');
}
    }


      // Edit note
const editnote= async(title,description,tag,id)=>{
try{
  // API call 
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlOTZhNjE1MjU5MTMxY2Q2ZmUyMWEzIn0sImlhdCI6MTcyNjU3MzE1M30.SNW6cwF2_JeOb5AeSMPwVG7_j616Gd5UtAmxH8McRAQ",
    },
    body: JSON.stringify({title,description,tag})
})


const responseData = await response.json();
if (response.ok) {
  // CHANGED: Simplified state update
  setNotes(prevNotes => 
    prevNotes.map(note => 
      note._id === id ? responseData : note
      ));
} else {
  console.error('Failed to update the note');
}
} catch (error) {
// ADDED: Better error logging
console.error('Error updating note:', error);
  };
  }
     

    return (
        <NoteContext.Provider value={{notes,setNotes,addnote,editnote,deletenote,getnote}}>
            {props.children}
        </NoteContext.Provider>
    
    )}
export default NoteState;

