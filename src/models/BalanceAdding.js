const mongoose = require('mongoose');

const BalanceAddingSchema = mongoose.Schema({
    _id: Number,
    date: Date,
    value: Number,
    b_id: Number,
    u_id: Number
});

module.exports = mongoose.model('BalanceAdding', BalanceAddingSchema);