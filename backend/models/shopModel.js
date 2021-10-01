const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShopSchema = new Schema({
    name: {type: String},
    vendor: {type: mongoose.Schema.Types.ObjectId , ref: 'Vendor'},
    address: {type: String},
    account: {type:String},
    services: [{}],
    rating:{
        type: Array,
        min: 1,
        max: 5
    }
})

const Shop=mongoose.model('Shop', ShopSchema)
module.exports = Shop