const mongoose = require('mongoose');

const BalanceAddingSchema = mongoose.Schema({
    _id: Number,
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        default: 0
    },
    b_id: Number,
    u_id: Number
});

module.exports = mongoose.model('BalanceAdding', BalanceAddingSchema);
