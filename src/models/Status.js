const mongoose = require('mongoose');

const StatusSchema = mongoose.Schema({
    status_name: {
        type: String,
        required: true,
        default: "in process"
    }
});

module.exports = mongoose.model('Status', StatusSchema);
