const router = require('express').Router();
const path = require('path');
const Balance = require('../models/Balance');
const BalanceAdding = require('../models/BalanceAdding');
const User = require("../models/User");

router.get("/transaction-history", async (req, res) => {
  const user = await User.findOne({ email: req.query.email }).lean();
  const userBalanceAddings = await BalanceAdding.find({ u_id: user._id }, (err, uba) => {
    if (err)
      res.status(500)
        .send({
          "code": 500,
          "message": "server error"
        });
    else
      res.status(200).send(uba);
  })
})

module.exports = router
