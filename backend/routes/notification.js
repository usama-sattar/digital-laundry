const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer")
const smtpTransport = require('nodemailer-smtp-transport');

router.post("/sendMail", async (req,res)=>{
    //let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: "usamasattar1992@gmail.com", // generated ethereal user
            pass: "mynameisusama", // generated ethereal password
        },  
    });
    // send mail with defined transport object
    let mailOptions ={
        //from: '"NodeMailer" <usamasattar1992@gmail.com>', // sender address
        from: 'usamasattar1992@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: "Digital Laundry ✔", // Subject line
        text: "You have received a new order", // plain text body
        html: `<p>check your app to mark new orders</p>`, // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        cconsole.log("Message sent: %s", info.messageId + "mail sent");
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }})
})
// const fetch = require("node-fetch");

// router.post("sendAll", (req, res) => {
//   var notification = {
//     title: "Digital Laundry",
//     text: "Hello world",
//   };
//   var fcm_token = [];
//   var notification_body = {
//     notification: notification,
//     registration_ids: fcm_token,
//   };

//   fetch("https://fcm.googleapis.com/fcm/send", {
//     'method': "POST",
//     'headers': {
//       'Authorization':
//         "key="+"AAAAbD99ZDY:APA91bFEqoDfByu3nOeLCT5KDp3DDN-Y5teB57F_Rt_Nf5ASqGypYbEZlbKl4PJFsCjXn2KezPqeJWLOedXezRE7fwsm4LCBIWx438YjIOTkz0-u6WWzJRz6S4PEI5PYwWBtMe-faY-u",
//         'Content-Type': 'application/json'
//     },
//     'body': JSON.stringify(notification_body),
//   }).then(()=>res.status(200).send("notification send successfully"))
//   .catch((err)=>console.log(err))
// });

module.exports = router;
