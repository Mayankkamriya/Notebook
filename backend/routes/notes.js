const express = require ('express');
const router = express.Router();

router.get('/',(req,res) =>{
    obj = {     //in cromeweb we see a and  number with output
        a: 'thios',
        number : 35
    } 
    res.json(obj)
} )
    module.exports =router