import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000"

    const NotesInitial =[]
      const [notes, setNotes] = useState(NotesInitial);

     // Get all note
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
        // {
          // "_id": "66ea66ee7bca32927490166e",
          // "user": "66e96a615259131cd6fe21a3",
          // "title": title,
          // "description": description,
          // "tag": "personal",
          // "date": "2024-09-18T05:36:46.312Z",
          // "__v": 0
        // }
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
      // }
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
    body: JSON.stringify(title,description,tag)
})

      // login to edit in client

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title= title;
        element.description= description;
        element.tag= tag;
      }
      
    }}
     

    return (
        <NoteContext.Provider value={{notes,setNotes,addnote,editnote,deletenote,getnote}}>
            {props.children}
        </NoteContext.Provider>
    )}

export default NoteState;


