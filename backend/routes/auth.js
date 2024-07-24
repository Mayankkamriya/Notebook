const express = require ('express');
const router = express.Router();
const User = require('../models/User')

router.post('/',(req,res) =>{
    console.log(req.body);
    const user =User(req.body);//we write in json it shows in thunderclient response and also it provide access to User file inside model folder and we can define what should return in Json
    user.save(); //By writing this we can save our data in database
   // res.send("Hello from auth") //this show in terminal and cromeweb and in thunderclient response  
    res.send(req.body); //we write in json it shows in thunderclient response 
})

    module.exports =router
