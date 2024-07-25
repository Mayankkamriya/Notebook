const express = require ('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post('/',[
        body('name','Enter a valid name').isLength({min:3}), 
        body('email','Enter a valid Email').isEmail(),      //  ,'Custom message'
        body('password','Password must be 5 character').isLength({min:5})
    ],(req,res) =>{
    const errors = validationResult (req);      // For checking that user enter valid data---validationResult
        if(!errors.isEmpty()){  //This error code handles the error if user enter an invalid data
        return res.status(400).json({errors: errors.array()}); 
    }

User.create({           // New way of writing 'user' code which we have written below previously
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
})
    .then(user=>res.json(user))     //if you have written 'res.json' then no need to write 'res.send' 
    .catch(err=> {console.log(err)   // For catching an error if user does not enter a unique email
    res.json({error: 'Please Enter a unique a value for email' , message: err.message})})  // By this '.message' We can print error message in Json(Thunderclient repository) if we want

//     console.log(req.body);
//     const user =User(req.body);//we write in json it shows in thunderclient response and also it provide access to User file inside model folder and we can define what should return in Json
//     user.save(); //By writing this we can save our data in database
//    // res.send("Hello from auth") //this show in terminal and cromeweb and in thunderclient response  
//      res.send(req.body); //we write in json it shows in thunderclient response 
 
    })

    module.exports =router
