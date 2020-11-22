const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
    _id: Number,
    status_name: String
});

module.exports = mongoose.model('Status', StatusSchema);