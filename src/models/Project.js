const mongoose = require('mongoose');

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
    status_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Status'
    },
    archive_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Status'
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
