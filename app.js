const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const Balance = require('./src/models/Balance');
const BalanceAdding = require('./src/models/BalanceAdding');
const Camera = require('./src/models/Camera');
const Font = require('./src/models/Font');
const Plagin = require('./src/models/Plagin');
const Project = require('./src/models/Project');
const RenderUtility = require('./src/models/RenderUtility');
const Status = require('./src/models/Status');
const User = require('./src/models/User');

const salt = bcrypt.genSalt(10);
const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

const router = app.Router;
// const compiler = webpack(webpackConfig);
// const devServerOptions = {
//     publicPath: webpackConfig.output.publicPath,
//     writeToDisk: true,
// };

mongoose.connect('mongodb://localhost:27017/cloud-designDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// app.use(devMiddleware(compiler, devServerOptions));
//
// app.use(hotMiddleware(compiler, {
//     log: console.log,
//     path: '/__webpack_hmr',
//     heartbeat: 10 * 1000,
//     timeout: 20 * 1000,
// }));

app.use(express.json())

app.post("/sign-up", async (req, res) => {

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
    try {
      newUser.save();
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

app.post("/sign-in", async (req, res) => {

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
    if (!validPass)
      return res.status(422).send({
        "code": 422,
        "message": "Authorization failed"
      });

    res.status(200).send({
      "code": 200,
      "message": ""
    });

  } catch(err) {
    console.log(err);
    res.status(500).send({
      "code": 500,
      "message": "Server error"
    })
  }
});

app.listen(8080, () => {
  console.log('Running local server');
});
