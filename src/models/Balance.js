const mongoose = require('mongoose');

const BalanceSchema = mongoose.Schema({
    _id: Number,
    u_id: Number,
    value: Number
});

module.exports = mongoose.model('Balance', BalanceSchema);