const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const Grid = require('gridfs-stream');
const Font = require('./src/models/Font');
const Format = require('./src/models/Format');
const Plugin = require('./src/models/Plugin');
const Program = require('./src/models/Program');
const RenderUtility = require('./src/models/RenderUtility');

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

Format.countDocuments({}, (err, count) => {
  if (!(count > 0)) {
    const newF = new Format({
      id: 0,
      name: "JPG"
    }).save();
    const newF2 = new Format({
      id: 1,
      name: "PNG"
    }).save();
    const newF3 = new Format({
      id: 2,
      name: "MP4"
    }).save();
  }
});

Plugin.countDocuments({}, (err, count) => {
  if (!(count > 0)) {
    const newF = new Plugin({
      id: 0,
      name: "Без плагина"
    }).save();
    const newF2 = new Plugin({
      id: 1,
      name: "Realflow"
    }).save();
    const newF3 = new Plugin({
      id: 2,
      name: "SigerNoise"
    }).save();
  }
});

RenderUtility.countDocuments({}, (err, count) => {
  if (!(count > 0)) {
    const newF = new RenderUtility({
      id: 0,
      name: "V-ray"
    }).save();
    const newF2 = new RenderUtility({
      id: 1,
      name: "Corona"
    }).save();
    const newF3 = new RenderUtility({
      id: 2,
      name: "Arnold"
    }).save();
  }
});

Font.countDocuments({}, (err, count) => {
  if (!(count > 0)) {
    const newF = new Font({
      id: 0,
      name: "Arial"
    }).save();
    const newF2 = new Font({
      id: 1,
      name: "PT Sans"
    }).save();
    const newF3 = new Font({
      id: 2,
      name: "Times New Roman"
    }).save();
  }
});

Program.countDocuments({}, (err, count) => {
  if (!(count > 0)) {
    const newP = new Program({
      id: 0,
      name: "3Ds Max"
    }).save();
    const newP2 = new Program({
      id: 1,
      name: "Cinema 4D"
    }).save();
    const newP3 = new Program({
      id: 2,
      name: "Blender"
    }).save();
    const newP4 = new Program({
      id: 3,
      name: "After Effects"
    }).save();
    const newP5 = new Program({
      id: 4,
      name: "Maya"
    }).save();
    const newP6 = new Program({
      id: 5,
      name: "Houdini"
    }).save();
  }
});
