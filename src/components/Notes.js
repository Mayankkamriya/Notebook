import React,{useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
  const context= useContext (noteContext);
  const {notes,getnote} = context;

  useEffect(() => {
    getnote()
    // eslin-disable-next-line
  }, [])
  
  return (<>
     <Addnote/>
<div className="row my-3">
<h2> your Note</h2>
 {notes.map((note) =>{
  return <Noteitem note={note} key={note.id}/>;
})} 

</div>
   </>)}
export default Notes;
