const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
let Prayer = mongoose.model("Prayer");


router.post("/", (req, res) => {
  let newPrayer = new Prayer();
  newPrayer.description = req.body.prayer.description;
  newPrayer.prayerAnswered = false;
  newPrayer.userId = req.body.userId;
  newPrayer.prayerHelper = [{
    sId: req.body.userId
  }];

  newPrayer.save(err => {
    if (err) {
      res.send(err);
    } else {
      res.end();
    }
  });
});

router.get("/", (req, res) => {
  Prayer.find({}).then(orders => {
    res.json(orders);
    //console.log(orders)
  });
});

router.put("/:id", (req, res) => {
  Prayer.findById(req.params.id, (err, prayer) => {
    if (err) {
      res.send(err);
    } else {

      prayer.description = req.body.description;

      prayer.save(err => {
        if (err) {
          res.send(err);
        } else {
          res.end();
        }
      });
    }
  });
});

router.post("/helper/:id", (req, res) => {

  Prayer.findById(req.params.id, (err, Prayer) => {
    if (err) {
      res.send(err)
    } else {
      var support = new Object();
      support.sId = req.body.userId;

      Prayer.prayerHelper.push(support);

      Prayer.save((err) => {
        if (err) {
          res.send(err)
        } else {
          res.end()
        }
      })
    }
  })
});

router.delete("/:id", (req, res) => {
  Prayer.deleteOne({
      _id: req.params.id
    },
    err => {
      if (err) {
        res.send(err);
      } else {
        res.end();
      }
    }
  );
});

router.put("/answered/:id", (req, res) => {
  Prayer.findById(req.params.id, (err, Prayer) => {
    if (err) {
      res.send(err);
    } else {

      Prayer.prayerAnswered = Set.prayerAnswered = true;

      Prayer.save(err => {
        if (err) {
          res.send(err);
        } else {
          res.end();
        }
      });
    }
  });
});

module.exports = router;
