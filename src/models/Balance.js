const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const BalanceSchema = mongoose.Schema({
    u_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    hours: {
        type: Number,
        default: 0
    },
    rubbles: {
        type: Number,
        default: 0
    }
});

module.exports = connection.model('Balance', BalanceSchema);
