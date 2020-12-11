const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/cloud-designDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const StatusSchema = mongoose.Schema({
    status_id: Number,
    status_name: {
        type: String,
        required: true,
        default: "В процессе"
    },
    style: {
        type: String,
        default: 'warning'
    }
});

module.exports = connection.model('Status', StatusSchema);
