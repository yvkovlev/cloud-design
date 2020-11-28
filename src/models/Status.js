const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
    _id: Number,
    status_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Status', StatusSchema);
