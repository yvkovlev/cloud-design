const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const PluginSchema = mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = connection.model('Plugin', PluginSchema);
