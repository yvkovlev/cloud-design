const mongoose = require('mongoose');

const CameraSchema = mongoose.Schema({
    _id: Number,
    camera_name: {
        type: String,
        required: true
    },
    minutes: {
        type: Number,
        default: 0
    },
    project_id: Number
});

module.exports = mongoose.model('Camera', CameraSchema);
