
const express = require ('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'mayankis';

// Router 1: Create a user using post "/api/auth/createuser" 
router.post('/createuser',[  
        body('name','Enter a valid name').isLength({min:3}), 
        body('email','Enter a valid Email').isEmail(),      //  ,'Custom message'
        body('password','Password must be 5 character').isLength({min:5})
    ], async (req,res) =>{

        // If there are errors, return Bad request and the errors
    const errors = validationResult (req);      // For checking that user enter valid data---validationResult
        if(!errors.isEmpty()){  //This error code handles the error if user enter an invalid data
        return res.status(400).json({errors: errors.array()}); 
    }

    // check whether the user with this email exits already
    try {
  let user = await User.findOne({email: req.body.email});
  /*console.log(user); */
  if(user){         //If user already exists it return sorry a user....
    return res.status(400).json({error: "sorry a user with this email already exist"})
}

// hash password
const salt = await bcrypt.genSalt(10); //Generating salt
const secpassword = await bcrypt.hash( req.body.password,salt);

// create a new user  (the password is hashed)
   user = await User.create({           // For cheque whether the user with this email exists already
    name: req.body.name,
    password: secpassword,
    email: req.body.email,
}) 

const payload ={
    user:{
        id:user.id
    }
}; 

      // Sign the token
    const token = jwt.sign(payload,JWT_SECRET);//, { expiresIn: JWT_EXPIRES_IN } for expering token in so and so time

   // Return the token and user data (without password)
   res.json({ token, user: { id: user.id, name: user.name, email: user.email } });

      //Below 2 line whichever we write first only that line process and above line replace below 2 line 
/*    res.json(token) //token print in Response sheet
    res.json(user) // Because of these intended client we can see our user data that we are sending  */
 }

// catch error
 catch (error){
    console.error('Error in /createuser:',error.message);
    res.status(500).send("Some Error occured 1")
}
    })

    
    // Router 2: Authenticate a user using: post "/api/auth/login" 

    router.post('/login',[  // router-post main request ki ja rahi hai
        body('email','Enter a valid Email').isEmail(),      
        body('password','Password cannot be blank').exists(),
    ], async (req,res) =>{

        // If there are errors, return Bad request and the errors
    const errors = validationResult (req);      // For checking that user enter valid data---validationResult
        if(!errors.isEmpty()){  // This error code handles the error if user enter an invalid data
        return res.status(400).json({errors: errors.array()}); 
    }

const {email, password }= req.body; // To extract data, we are using req.body
try{
    let  user = await User.findOne({email});//matching the email with our already existing data using await, meaning the code will not proceed until a match is found
    if(!user){  // If user not exist bad request 400 show end this message show
        return res.status(400).json({error:"email not find"});
    }
    const isMatch = await bcrypt.compare(password,user.password); //If the email matches, then only we will compare the passwords
    //comapring password With password given by user

if(!isMatch){
    return res.status(400).json({error:"incorrect password"})
}

const payload ={
    user:{
        id:user.id
    }
}; 

    const token = jwt.sign(payload,JWT_SECRET);  // Sign the token
    res.json({token}); //login response sheet main token dikega
} catch(error){
    console.error('Error in /login:',error.message);
    res.status(500).send("Internal server Error occured ")
}
    })

        // Router 3: Get loggedin user Details using: post "/api/auth/getuser". login required 

    router.post('/getuser' ,fetchuser, async(req,res)=>{
        try{
        if (!req.user || !req.user.id) { // Check if user id is valid
            return res.status(401).json({ error: "Unauthorized: Invalid Token" });
        }
        
       userId = req.user.id; // Extract user id from token
       const user = await User.findById(userId).select("-password") //return user data except password
        res.send(user)

    } catch(error){ 
        console.error('Error in /login:',error.message); // log error for /getuser route
        res.status(500).send("Internal server Error occured ") // 500 status for internal server errors
    }
        })
        

    module.exports =router
