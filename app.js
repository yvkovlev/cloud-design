const mongoose = require('mongoose');
const express = require('express');
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

mongoose.connect("mongodb://localhost:27017/cloud-designDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("<h1>Hi</h1>")
})

app.listen(3000, () => {
    console.log("Running local server");
})
