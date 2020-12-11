const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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

module.exports = connection.model('BalanceAdding', BalanceAddingSchema);
