const express = require("express");
const router = express.Router();
const Shop = require("../models/shopModel");

router.get("/", (req, res) => {
  Shop.find()
    .then((shops) => res.send(shops))
    .catch((err) => console.log(err));
});
router.post("/create", (req, res) => {
  Shop.find({ name: req.body.name }).then((result) => {
    if (!result) {
      const shop = new Shop({
        name: req.body.name,
        address: req.body.address,
        account: req.body.account,
        vendor: req.body.vendorId,
        services: req.body.services,
      });
      shop
        .save()
        .then((data) => {
          console.log("shop created");
          res.send(data);
        })
        .catch((err) => console.log(err));
    } else {
      res.send({ error: "some error occurred" });
    }
  });
});
router.delete("/delete/:id", (req, res) => {
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
//     res.send(data);
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


module.exports = router;
