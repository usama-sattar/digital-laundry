const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("sendAll", (req, res) => {
  var notification = {
    title: "Digital Laundry",
    text: "Hello world",
  };
  var fcm_token = [];
  var notification_body = {
    notification: notification,
    registration_ids: fcm_token,
  };

  fetch("https://fcm.googleapis.com/fcm/send", {
    'method': "POST",
    'headers': {
      'Authorization':
        "key="+"AAAAbD99ZDY:APA91bFEqoDfByu3nOeLCT5KDp3DDN-Y5teB57F_Rt_Nf5ASqGypYbEZlbKl4PJFsCjXn2KezPqeJWLOedXezRE7fwsm4LCBIWx438YjIOTkz0-u6WWzJRz6S4PEI5PYwWBtMe-faY-u",
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify(notification_body),
  }).then(()=>res.status(200).send("notification send successfully"))
  .catch((err)=>console.log(err))
});

module.exports = router;
