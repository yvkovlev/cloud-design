const router = require('express').Router();
const path = require('path');
const Balance = require('../models/Balance');
const BalanceAdding = require('../models/BalanceAdding');
const User = require("../models/User");

router
  .get("/balance", async (req, res) => {
    const user = await User.find({ email: req.body.email});
    const current = await Balance.find({ u_id: user._id}, (err, balance) => {
      if (err)
        res.status(500).send({
          "code": "500",
          "message": "server error"
        })
      else
        res.status(200).send(balance);
    })

  })

  .post("/balance", async (req, res) => {
    const user = User.findOne({});
    res.json(user);
    // const current = Balance.find({ u_id: userinho._id }, (err, balance) => {
    //   if (err)
    //     res.status(500)
    //       .send({
    //         "code": "500",
    //         "message": "server error"
    //       })
    // });
    // const newBalanceAdding = new BalanceAdding({
    //   b_id: current._id,
    //   value_hours: req.body.hours,
    //   value_rubbles: req.body.cost
    // })
    // const balanceUpdate = Balance.findOneAndUpdate(
    //   { u_id: user._id },
    //   {
    //     $set: {
    //       hours: current.hours + req.body.hours,
    //       rubbles: current.rubbles + req.body.cost
    //     }
    //   },
    //   (err) => {
    //     if (err) {
    //       return res.status(500)
    //         .send({
    //           "code": "500",
    //           "message": "server error"
    //         })
    //     } else {
    //       return res.status(200)
    //         .send({
    //           "code": "200",
    //           "message": ""
    //         })
    //     }
    //   })
  })

module.exports = router;
