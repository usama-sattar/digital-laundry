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
    .then(()=>{
        Shop.find({vendor:req.params.id})
        .then(() => {res.send("successfully deleted")})
        .catch((err) => console.log(err));
    })
    .catch((err)=> console.log(err))
    
})
router.get('/pending/:id', (req,res)=>{
    Order.find({vendorId: req.params.id, status: 'pending'})
    .then((data)=>{res.send(data)})
    .catch((err)=> console.log(err))
    
})
router.post('/pending/:id', (req,res)=>{
    Order.findByIdAndUpdate(req.params.id,{
        status: req.body.status
    })
    .then(()=>{res.send("status changed")})
    .catch((err)=> console.log(err))
    
})

module.exports=router
