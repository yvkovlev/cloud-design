const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    _id: Number,
    project_name: {
        type: String,
        required: true
    },
    output_format: String,
    output_height: Number,
    output_width: Number,
    comment: String,
    link_to_archive: String,
    program: String,
    frame_start: Date,
    frame_end: Date,
    start_date: Date,
    end_date: Date,
    status_id: Number
});

module.exports = mongoose.model('Project', ProjectSchema);
