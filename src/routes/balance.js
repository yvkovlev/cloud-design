const router = require('express').Router();
const path = require('path');
const Balance = require('../models/Balance');
const BalanceAdding = require('../models/BalanceAdding');
const User = require('../models/User');
const passport = require('../middlewares/passport');

router
  .get("/balance", passport, async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).lean();
    const current = await Balance.findOne({ u_id: user._id }, (err, balance) => {
      if (err)
        res.status(500).send({
          "code": "500",
          "message": "server error"
        })
      else
        res.status(200).json(balance);
    })
  })

  .post("/balance", passport, async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).lean();
    const currentBalance = await Balance.findOne({ u_id: user._id }).lean();

    const newBalanceAdding = new BalanceAdding({
      u_id: user._id,
      value_hours: req.body.hours,
      value_rubbles: req.body.cost
    });
    newBalanceAdding.save();

    const balanceUpdate = Balance.findOneAndUpdate(
      { u_id: user._id },
      {
        $set: {
          hours: currentBalance.hours + parseInt(req.body.hours),
          rubbles: currentBalance.rubbles + parseInt(req.body.cost)
        }
      },
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500)
            .send({
              "code": 500,
              "message": "Server error"
            })
        } else {
          return res.status(200)
            .send({
              "code": 200,
              "message": ""
            })
        }
      })
  });

module.exports = router;
