const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    user: {type:String},
    vendor: {type:String},
    messages:[{}]
},
{
    timestamps: true
}
)
const Chat=mongoose.model('Chat', ChatSchema)
module.exports = Chat