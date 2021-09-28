const express = require('express')
const router = express.Router();

const Rider= require('../models/riderModel')

router.get('/total', (req,res)=>{
    Rider.find()
    .then((user)=> res.json(user))
    .catch((err)=> console.log(err))
})
router.delete('/delete/:id', (req,res)=>{
    Rider.findByIdAndDelete(req.params.id)
    .then(()=>{res.send("user deleted")})
    .catch((err)=> console.log(err))
    
})

module.exports=router
