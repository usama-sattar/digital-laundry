const express = require("express");
const router = express.Router();
const Shop = require("../models/shopModel");
var multer = require("multer")
var path = require('path');

var Storage= multer.diskStorage({
  destination:"./public/uploads",
  filename: (req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
})

var upload=multer({
  storage: Storage,
  fileFilter:function(req,file,cb){
    checkType(file,cb);
  }
}).single('file')

function checkType(file,cb){
  const filetypes=/jpeg|png|gif|jpg/;
  const extname= filetypes.test(path.extname(file.originalname).toLowerCase())
  if(extname){
    return cb(null, true)
  }
  else{
     cb("Error! Images only (png,jpg,jped,gif)")
  }
}

router.get("/", (req, res) => {
      Shop.aggregate(([ {$addFields : {average : {$avg : "$rating"}}} ]))
      .then(result=>res.send(result))
      .catch(err=>console.log(err))
});

router.get("/:id" , (req,res)=>{
  Shop.findOne({vendor: req.params.id})
    .then((shop) => res.json(shop))
    .catch((err) => console.log(err));
})
router.post("/create",  (req, res) => {
      const shop = new Shop({
        name: req.body.name,
        address: req.body.address,
        account: req.body.account,
        vendor: req.body.vendorId,
        services: req.body.services,
        coordinate: req.body.coordinates,
        location: req.body.location
      });
      shop
        .save()
        .then((data) => {
          console.log("shop created");
          res.send(data);
        })
        .catch((err) => console.log(err));
    } 
);
router.post("/update/:id", (req,res)=>{
  Shop.findByIdAndUpdate(req.params.id,
    { 
      services: req.body.services
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
})

router.get("/nearby/:longitude/:latitude", async (req, res) => {
  Shop.ensureIndexes({"coordinate": "2dsphere"})
  Shop.find({
    "coordinate": {
      "$near": {
        "$geometry": {
          "type": "Point",
          "coordinates": [
            parseFloat(req.params.longitude),
            parseFloat(req.params.latitude)
          ],
        },
        "$maxDistance": 10000
      }
    }
  })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.delete("/delete/:id", (req, res) => {
  console.log("del called ")
  Shop.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("shop deleted");
    })
    .catch((err) => console.log(err));
});

// router.get("/find/:name", async(req, res) => {
//   const data = await Shop.find({
//     name: { $regex: req.params.name, $options: "i" },
//   });
//   try {
//     if(data.length > 0) {res.send(true);}
//     else {res.send(false)}
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
router.get("/find/:name", async(req, res) => {
  const data = await Shop.find({
    name: req.params.name ,
  });
  console.log(data)
  try {
    if(data.length > 0) {res.send(true);}
    else {res.send(false)}
  } catch (err) {
    res.status(400).send(err);
  }
 });
router.post("/rating/:id", async (req,res)=>{
  Shop.findByIdAndUpdate({_id: req.params.id}, 
  {$push: {'rating': req.body.rating}}, 
  {new: true}, (err, result) => {
      if(err){
          res.status(400).send(err)
      }
      else{
          res.send(result)
      }
 })
})
router.get("/avg/rating", (req,res)=>{
  Shop.aggregate(([ {$addFields : {average : {$avg : "$rating"}}} ]))
  .then(result=>res.send(result))
  .catch(err=>console.log(err))
})

module.exports = router;
