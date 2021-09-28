const express = require('express')
const router = express.Router();
const Vendor= require('../models/vendorModel')
const Order = require('../models/orderModel')

router.get('/total', (req,res)=>{
    Vendor.find()
    .then((user)=> res.json(user))
    .catch((err)=> console.log(err))
})
router.delete('/delete/:id', (req,res)=>{
    Vendor.findByIdAndDelete(req.params.id)
    .then(()=>{res.send("user deleted")})
    .catch((err)=> console.log(err))
    
})
router.get('/pending/:id', (req,res)=>{
    Order.findByIdAndUpdate(req.params.id,{
        status: "ready to ship"
    })
    .then(()=>{res.send("status changed")})
    .catch((err)=> console.log(err))
    
})

module.exports=router
