const mongoose = require('mongoose');

const CameraSchema = mongoose.Schema({
    _id: {
        type: Number,
        unique: true
    },
    camera_name: String,
    minutes: Number,
    project_id: Number
});

module.exports = mongoose.model('Camera', CameraSchema);