const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const BalanceAddingSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    value_hours: {
        type: Number,
        default: 0
    },
    value_rubbles: {
        type: Number,
        default: 0
    },
    u_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = connection.model('BalanceAdding', BalanceAddingSchema);
