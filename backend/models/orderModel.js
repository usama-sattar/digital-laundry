const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId , ref: 'Customer'},
    name: {type: String},
    email: {type: String},
    address: {type: String},
    contact: {type: String},
    vendor: {type: mongoose.Schema.Types.ObjectId , ref: 'Vendor'},
    cart: [{}],
    total: {type:String}
})

const Order=mongoose.model('Order', OrderSchema)
module.exports = Order