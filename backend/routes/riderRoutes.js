const express = require('express')
const router = express.Router();

const Rider= require('../models/riderModel')

router.get('/total', (req,res)=>{
    Rider.find()
    .then((user)=> res.json(user))
    .catch((err)=> console.log(err))
})

module.exports=router
