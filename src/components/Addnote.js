import React,{useContext ,useState} from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const context= useContext (noteContext);
    const {addnote} = context;

    const [note, setnote] = useState({title: "",description:"" ,tag: "default"})

    const handleclick=(e)=>{
        e.preventDefault(); // Prevent the page from reloading

        if (note.title.trim() === '' || note.description.trim() === '') {
          alert('Please enter both title and description');
          return;
        }

        addnote(note);//What we write in title description box it shows in title description in crome by this
      }

    const onchange=(e)=>{
        setnote ({...note,[e.target.name]:e.target.value}) //By this all the values remain as it is except whose name we have assigned Whatever is changing that's name become equals to that value   OR jo bhi change ho raha hai uska name uski value ke barabar ho jaye
    }

  return (<>
    <div className="container my-3">
    <h2>Add a Note</h2>
      <form className='my-3'>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input type="title" className="form-control" id="title" name="title" onChange={onchange} aria-describedby="emailHelp"/>
     </div>
    <div className="mb-3">
      <label htmlFor="desc" className="description">Description
      </label>
      <input type="text" className="form-control" id="text" name="description" onChange={onchange}/>
    </div>
    {/* <div className="mb-3">
      <label htmlFor="desc" className="tag">Tag
      </label>
      <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}/>
    </div> */}
    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add</button>
    
  </form>
  </div>
  
 
  </>
  )
}

export default Addnote;