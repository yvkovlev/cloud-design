const mongoose = require('mongoose');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const bodyParser = require('body-parser');
const Balance = require('./src/models/Balance');
const BalanceAdding = require('./src/models/BalanceAdding');
const Camera = require('./src/models/Camera');
const Font = require('./src/models/Font');
const Plagin = require('./src/models/Plagin');
const Project = require('./src/models/Project');
const RenderUtility = require('./src/models/RenderUtility');
const Status = require('./src/models/Status');
const User = require('./src/models/User');

const app = express();
const compiler = webpack(webpackConfig);
const devServerOptions = {
    open: true,
    stats: {
        colors: true,
    },
    logLevel: 'warn',
    publicPath: webpackConfig.output.publicPath
};

mongoose.connect("mongodb://localhost:27017/cloud-designDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(devMiddleware(compiler, devServerOptions));

app.use(hotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    timeout: 20 * 1000,
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("<h1>Hi</h1>")
})

app.listen(8080, () => {
    console.log("Running local server");
})
