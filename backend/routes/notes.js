const express = require ('express');
const router = express.Router();

router.get('/',(req,res) =>{
    obj = {     //in cromeweb we see A and number with output 
        A: 'thios',
        number : 35
    } 
    res.json(obj)
} )
    module.exports =router