const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    status_name: String
});

module.exports = mongoose.model('Status', StatusSchema);