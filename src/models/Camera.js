const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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

module.exports = connection.model('Camera', CameraSchema);
