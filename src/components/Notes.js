import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';import Addnote from './Addnote';


const Notes = () => {
  const context = useContext(noteContext);
  let Navigate = useNavigate();
  const { notes, getnote,editnote } = context;

  useEffect(() => {
if(localStorage.getItem('token')){
  getnote()
}
else{
  Navigate('/Login');
}
    // eslint-disable-next-line
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleShowModal = (currentNote) => {
    setShowModal(true);
    setNote({id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleUpdateNote = (id,title,description,tag) => {
    handleCloseModal();
    editnote(note.id,note.title ,note.description ,note.tag );
  };

  return ( <>
      <Addnote />

      {/* Modal for updating a note */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control"id="title" name="title" value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })} minLength={2} required
            />
         </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description"
             value={note.description} onChange={(e) => setNote({ ...note, description: e.target.value })} minLength={2} required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag}
              onChange={(e) => setNote({ ...note, tag: e.target.value })}
            />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}> Close </Button>
          <Button variant="primary" disabled={note.title.length<2 ||note.description.length<2} onClick={handleUpdateNote}> Update Note </Button>
        </Modal.Footer>
      </Modal>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {(!notes || notes.length === 0) && `No notes to display`}
        </div>
        {Array.isArray(notes) && notes.map((note) => {
          return (
            <Noteitem key={note._id} updatenote={handleShowModal} note={note} />
          );
        })}
      </div>

    </>)};

export default Notes;
