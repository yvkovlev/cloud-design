const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const BalanceSchema = mongoose.Schema({
    _id: Number,
    u_id: {
        type: Number,
        required: true
    },
    value: Number
});

module.exports = connection.model('Balance', BalanceSchema);
