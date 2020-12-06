const mongoose = require('mongoose');
const express = require('express');
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
const Plagin = require('./src/models/Plugin');
const Project = require('./src/models/Project');
const RenderUtility = require('./src/models/RenderUtility');
const Status = require('./src/models/Status');
const User = require('./src/models/User');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

const router = app.Router;

mongoose.connect('mongodb://localhost:27017/cloud-designDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const authRoute = require('./src/routes/auth');
const addProjectRoute = require('./src/routes/addProject');

app.use(express.json())

app.use("/api", authRoute);
app.use("/api", addProjectRoute);

app.listen(8080, () => {
  console.log('Running local server');
});
