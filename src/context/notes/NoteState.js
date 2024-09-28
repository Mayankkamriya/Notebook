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

  // API call 
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlOTZhNjE1MjU5MTMxY2Q2ZmUyMWEzIn0sImlhdCI6MTcyNjU3MzE1M30.SNW6cwF2_JeOb5AeSMPwVG7_j616Gd5UtAmxH8McRAQ",
    },
    body: JSON.stringify({title,description,tag})
})

if (response.ok) {
console.log(response);
const json = await response.json(); 
console.log(json);

// Logic to update the note in the frontend after the backend has updated it
const updatedNotes = notes.map((note) => note._id === id ? json : note);
setNotes(updatedNotes);
} 
// else {
//   console.error('Failed to update the note');
// }

let newNotes =JSON.parse(JSON.stringify(notes))
      // login to edit in client

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title= title;
        newNotes[index].description= description;
        newNotes[index].tag= tag;
        break;
      }
    } 
    setNotes(newNotes);
  }
     

    return (
        <NoteContext.Provider value={{notes,setNotes,addnote,editnote,deletenote,getnote}}>
            {props.children}
        </NoteContext.Provider>
    )}

export default NoteState;

