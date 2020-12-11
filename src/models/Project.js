const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const ProjectSchema = mongoose.Schema({
    // p_id: {
    //     type: Number,
    //     default: 0
    // },
    project_name: {
        type: String,
        required: true
    },
    output_format: String,
    output_height: Number,
    output_width: Number,
    comment: String,
    program: String,
    frame_start: Date,
    frame_end: Date,
    start_date: {
        type: Date,
        default: Date.now()
    },
    end_date: Date,
    user_email: String,
    status_id: {
        type: Number,
        ref: 'Status',
        default: 2
    },
    archive_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Status'
    }
});

module.exports = connection.model('Project', ProjectSchema);
