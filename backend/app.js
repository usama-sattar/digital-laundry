const express = require('express')
const mongoose = require('mongoose')
const otpRoutes = require('./routes/otpRoutes')
const customerRoutes = require('./routes/customerRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const riderRoutes = require('./routes/riderRoutes')
const shopRoutes = require('./routes/shopRoutes')
const ratingRoutes = require('./routes/ratingRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const notificationRoutes = require('./routes/notification')
const Chat = require('./models/chatModel')
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://usama:12345USAMAsattaR@digitallaundry.4ynkr.mongodb.net/digitalLaundry?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const connection = mongoose.connection
connection.once("open", async ()=>{
    await console.log("database established");
})
io.on('connection', socket =>{
    const id = socket.handshake.query.id
    socket.join(id)
    socket.on('get-room', async (receiver)=>{
        const document = findOrCreate(receiver, id)
        socket.emit('load-room', document)
        socket.on('send-message', ({receiver, text}) => {
            socket.broadcast.to(receiver).emit('recieve-message', {
                receiver, text, sender: id,
            })
            socket.on('save-chat', async data=>{
            return await Chat.findOneAndUpdate({user: id, vendor: receiver}, {data})
        })
    })
})
})
const findOrCreate = async (vendor,user) =>{
    if(vendor===null || user===null){
        return
    }
    const doc = await Chat.find({user: user, vendor: vendor})
    if(doc) return doc
    return await Chat.create({user: user, vendor: vendor, messages:[{}]})
}
app.use('/booking', require('./routes/bookingRoutes')(io))
app.use('/app', ratingRoutes)
app.use('/verify', otpRoutes);
app.use('/customers',customerRoutes)
app.use('/vendors',vendorRoutes)
app.use('/riders',riderRoutes)
app.use('/shop',shopRoutes)
app.use('/notification', notificationRoutes)

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`server starting at ${PORT}`));

module.exports = app;

