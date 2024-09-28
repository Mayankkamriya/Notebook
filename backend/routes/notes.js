const express = require ('express');
const mongoose = require('mongoose');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body,validationResult} = require('express-validator');
//const {Schema} = mongoose;

  // Router 1: Get All Notes using: post "/api/notes/fetchallnotes". login required 
//Define route to fetch all notes
  router.get('/fetchallnotes',fetchuser, async(req,res) =>{
    try{
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
        body('title','Enter a valid title').isLength({min:3}), 
        body('description','description must be 5 character').isLength({min:5})], async (req,res) =>{

        try{
            const{title,description,tag}= req.body;
        // If there are errors, return Bad request and the errors
    const errors = validationResult (req);      // For checking that user enter valid data---validationResult
        if(!errors.isEmpty()){  //This error code handles the error if user enter an invalid data
        return res.status(400).json({errors: errors.array() }); 
        }
    
        const note = new Note({
            title,description,tag,user:req.user.id
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

 //Create update note route and validate user permission
//        router.put('/updatenote/:id' ,fetchuser,async(req,res)=>{
//         const {title,description,tag}= req.body; 
       
//         // const newNote={}; // Initialize newNote object with title, description, and tag
//         // if(title){newNote.title=title};
//         // if(description)  newNote.description=description;
//         // if(tag){newNote.tag=tag};

//         try{
//             if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//                 return res.status(400).send("Invalid note ID");
//             }

// //Find the note to be updates and update it 
//         let note = await Note.findById(req.params.id);

// // Add error handling for invalid note ID and unauthorized access
//         if(!note){
//             return res.status(404).send("not found")
//         } // if note don't found show error

//         if(note.user.toString()!== req.user.id ){
//         return res.status(401).send("Not Allowed to do");
// }
// const  updatenote = await Note.findByIdAndUpdate(
//     req.params.id,
//     { $set: { title, description, tag } },
//     { new: true, runValidators: true }
//     );
//     // note = await Note.findOneAndUpdate({_id: req.params.id},{$set: newNote},{new:true}); //find and update and also open for new data
//     res.json(updatenote);

//     } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Internal Server Error");
//     }
//        }) 


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    console.log(`Received update request for note id: ${req.params.id}`);
    console.log(`New values - Title: ${title}, Description: ${description}, Tag: ${tag}`);
  
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        console.log('Invalid note ID');
        return res.status(400).json({ error: "Invalid note ID" });
      }
  
      let note = await Note.findById(req.params.id);
      console.log('Found note:', note);
  
      if (!note) {
        console.log('Note not found');
        return res.status(404).json({ error: "Note not found" });
      }
  
      if (note.user.toString() !== req.user.id) {
        console.log('User not authorized to edit this note');
        return res.status(401).json({ error: "Not Allowed to edit" });
      }
  
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: { title, description, tag } },
        { new: true, runValidators: true }
      );
      
      if (!updatedNote) {
        console.log('Failed to update note');
        return res.status(500).json({ error: "Failed to update note" });
      }
  
      console.log('Updated note:', updatedNote);
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
    