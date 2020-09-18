const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventCenterSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    parkingSpaces: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    services: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    amenities: {
        type: Array
    },
    uploadedImg: {
        type: String
    }
})

module.exports = EventCenter = mongoose.model('eventCenter', EventCenterSchema)