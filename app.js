const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const Grid = require('gridfs-stream');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

const router = app.Router;

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// connection.on('error', (err) => {
//   console.error('MongoDB error: %s', err);
// });

let gfs;
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

const authRoute = require('./src/routes/auth');
const addProjectRoute = require('./src/routes/addProject');
const addBalanceRoute = require('./src/routes/balance');

app.use(express.json())

app.use("/api", authRoute);
app.use("/api", addProjectRoute);
app.use("/api", addBalanceRoute);

app.listen(8080, () => {
  console.log('Running local server');
});

// module.exports = connection;
