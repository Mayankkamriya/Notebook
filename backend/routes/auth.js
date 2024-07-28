// In this we have created a 'async' and 'await' function and uses 'try-catch' if something unexpected error occurred to handle it.

const express = require ('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post('/createuser',[  //create a user using post "/api/auth/createuser" 
        body('name','Enter a valid name').isLength({min:3}), 
        body('email','Enter a valid Email').isEmail(),      //  ,'Custom message'
        body('password','Password must be 5 character').isLength({min:5})
    ], async (req,res) =>{
    const errors = validationResult (req);      // For checking that user enter valid data---validationResult
        if(!errors.isEmpty()){  //This error code handles the error if user enter an invalid data
        return res.status(400).json({errors: errors.array()}); 
    }

    try {
  let user = await User.findOne({email: req.body.email});
  if(user){         //If user already exists it return sorry a user....
    return res.status(400).json({error: "sorry a user with this email already exist"})
  }
   user = await User.create({           // For cheque whether the user with this email exists already
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
})  
    res.json(user)
}
 catch (error){
    console.error(error.message);
    res.status(500).send("Some Error occured 1")
}
    })
    module.exports =router
