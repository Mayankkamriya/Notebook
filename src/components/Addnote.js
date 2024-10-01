import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" })

  const handleclick = (e) => {
    e.preventDefault(); // Prevent the page from reloading

    addnote(note) // What we write in title description box it shows in title description in crome by this 
    setnote({ title: "", description: "", tag: "" })
}

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value }) //By this all the values remain as it is except whose name we have assigned Whatever is changing that's name become equals to that value   OR jo bhi change ho raha hai uska name uski value ke barabar ho jaye
  }

  return (<>

    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} required aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="description">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} required />
        </div>
        <button disabled={note.title.length<2 ||note.description.length<2} type="submit" className="btn btn-primary" onClick={handleclick}>Add</button>
      </form>
    </div>

  </>)}

export default Addnote;