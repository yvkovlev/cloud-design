const router = require('express').Router();
const Balance = require('../models/Balance');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/sign-up", async (req, res) => {

  const anyUser = await User.findOne({ email: req.body.email });
  if (anyUser)
    return res.status(422).send({
      "code": 422,
      "message": "User exists"
    });

  else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name
    });

    const newBalance = new Balance({
      u_id: newUser._id
    });

    try {
      newUser.save();
      newBalance.save();

      return res.status(200).send({
        "code": 200,
        "message": ""
      })
    } catch(err) {
      return res.status(500).send({
        "code": 500,
        "message": "Server error"
      })
    }
  }

});

router.post("/sign-in", async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(422).send({
        "code": 422,
        "message": "Authorization failed"
      });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(422)
        .send({
          "code": 422,
          "message": "Authorization failed"
        });
    } else {
      // add key to config file
      const token = jwt.sign({
        email: user.email,
        userId: user._id
      }, 'jseohfn', { expiresIn: 60 * 60 });

      res.status(200).send({
        "code": 200,
        "message": "",
        "token": token
      });
    }

  } catch(err) {
    console.log(err);
    res.status(500).send({
      "code": 500,
      "message": "Server error"
    })
  }
});

module.exports = router;
