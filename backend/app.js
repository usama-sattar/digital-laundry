const express = require('express')
const mongoose = require('mongoose')
const otpRoutes = require('./routes/otpRoutes')
const customerRoutes = require('./routes/customerRoutes')
const vendorRoutes = require('./routes/vendorRoutes')
const riderRoutes = require('./routes/riderRoutes')
const shopRoutes = require('./routes/shopRoutes')
const ratingRoutes = require('./routes/ratingRoutes')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb+srv://usama:12345USAMAsattaR@digitallaundry.4ynkr.mongodb.net/digitalLaundry?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once("open", async ()=>{
    await console.log("database established");
})

app.use('/app', ratingRoutes)
app.use('/verify', otpRoutes);
app.use('/customers',customerRoutes)
app.use('/vendors',vendorRoutes)
app.use('/riders',riderRoutes)
app.use('/shop',shopRoutes)
app.use('/', (req,res)=>res.send("hello"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server starting at ${PORT}`));

module.exports = app;

