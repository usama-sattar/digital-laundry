module.exports = (io)=>{
const express = require("express");
const router = express.Router();
const Booking = require("../models/bookModel");
const RiderLocation = require("../models/riderLocationModel");

io.on("connection", (socket)=>{
  console.log("user connected")
})

router.get("/", (req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => console.log(err));
});
router.post("/post", (req, res) => {
  const { pickUpData, dropOffData, fare, status } = req.body.payload.data;
  const {socketId, riderId, latitude, longitude} = req.body.payload.nearData
  console.log(req.body.data)
  const booking = new Booking({
    pickUpData,
    dropOffData,
    fare,
    status,
  });
  booking
    .save()
    .then((data) => {
    res.send(data)
   io.emit(socketId + "riderRequest", data)
  })
  .catch((err) => console.log(err));
});
router.post("/update/location", async (req, res) => {
  const { riderId, coordinate, socketId } = await req.body;
  const obj = await RiderLocation.find({ riderId: riderId });
  if (obj.length > 0) {
    RiderLocation.findOneAndUpdate(
      { riderId: riderId },
      { socketId: socketId, coordinate: coordinate },
      function (err, result) {
        if (err) {
          console.log("error");
        } else {
          res.send(result);
        }
      }
    )
  } else {
    const location = new RiderLocation({
      riderId,
      coordinate,
      socketId,
    });
    location
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => console.log(err));
  }
});

router.get("/nearby/:longitude/:latitude", async (req, res) => {
  RiderLocation.ensureIndexes({"coordinate": "2dsphere"})
  RiderLocation.find({
    "coordinate": {
      "$near": {
        "$geometry": {
          "type": "Point",
          "coordinates": [
            parseFloat(req.params.longitude),
            parseFloat(req.params.latitude)
          ],
        },
        "$maxDistance": 1000000
      }
    }
  })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.post("/update/booking", async (req, res) => {
  const { _id, riderId, coordinate,  status} = await req.body;
  if (!status){
    res.status(400);
    res.json({
        "error":"Bad Data"
    });
} else {
  Booking.findOneAndUpdate({_id: _id},{
    riderId: riderId,
    status: status
  }, function (err, updatedBooking){
    if (err){
        res.send(err);
    }
    if (updatedBooking){
      Booking.findOne({_id: _id}, function (error, confirmedBooking) {
        if (error){
          res.send(error);
      }
      io.on("accept-ride", data =>{
        io.emit("ride-details", confirmedBooking)
      });  
      res.send(confirmedBooking);
      })
    }  
  })
}
});

  return router
}

