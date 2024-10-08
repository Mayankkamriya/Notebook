const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body,validationResult} = require('express-validator');

  // Router 1: Get All Notes using: post "/api/notes/fetchallnotes". login required 
//Define route to fetch all notes
  router.get('/fetchallnotes',fetchuser, async(req,res) =>{
    try{
      console.log(req.user); 
        const notes = await Note.find({ user: req.user.id});
        res.json(notes)
    }
     catch (error){  // catch error
        console.error('Error in /fetchallnotes:',error.message);
        res.status(500).send("Internal server Error");
    }
})

       // Router 2: Add a new Note using: post "/api/notes/addnote". login required  
 //Add route to post a new note
       router.post('/addnotes' ,fetchuser,[ //By using isLength in validation, if the user provides empty or insufficient details, the data won't be saved in the database. 
        body('title','Enter a valid title'),
        body('description','description must be 5 character')], async (req,res) =>{

        try{
          console.log(req.user);
            const{title,description,tag }= req.body;
          
            // If there are errors, return Bad request and the errors
    const errors = validationResult (req);      // For checking that user enter valid data---validationResult
        if(!errors.isEmpty()){  //This error code handles the error if user enter an invalid data
        return res.status(400).json({errors: errors.array() }); 
        }
    
        const note = new Note({
          title: req.body.title,
          description: req.body.description,
          tag: req.body.tag,
          user: req.user.id
        })
        const savedNote = await note.save();
    res.json(savedNote)
        }
              catch(error){
                console.error(error.message);
                res.status(500).send("Internal server Error");
              }
        })  

         // Router 3: Update an existing Note using: put "/api/notes/updatenote". login required  

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;  // Received update request for note id
   
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // check for Invalid note ID 
        return res.status(400).json({ error: "Invalid note ID" });
      }
  
      let note = await Note.findById(req.params.id);
      // console.log('Found note:', note);
  
      if (!note) { // if Note not found
        return res.status(404).json({ error: "Note not found" });
      }
  
      if (note.user.toString() !== req.user.id) { // User not authorized to edit this note
        return res.status(401).json({ error: "Not Allowed to edit" });
      }
  
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: { title, description, tag } },
        { new: true, runValidators: true }
      );
      
      if (!updatedNote) { // Failed to update note
        return res.status(500).json({ error: "Failed to update note" });
      }
  
      res.json(updatedNote);
    } catch (error) {
      console.error('Error in updatenote:', error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });


         // Router 4: Delete Note using: delete "/api/notes/deletenote". login required  

 //Create delete note route and validate user permission
 router.delete('/deletenote/:id' ,fetchuser,async(req,res)=>{
    try{

 // Check if the provided ID is valid
 if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid note ID");
}

//Find the note to be delete it 
    let note = await Note.findById(req.params.id);

// Add error handling for invalid note ID and unauthorized access
    if(!note){return res.status(404).send("not found")} // if note don't found show error
    if(note.user.toString()!== req.user.id ){
    return res.status(401).send("Not Allowed to do");
}

note = await Note.findByIdAndDelete({_id: req.params.id}); //find and delete
res.json({ "Success":"Note has been deleted" ,note:note});// after delete show success message and note that been deleted

} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
}
   }) 

    module.exports =router // Export router for notes
    